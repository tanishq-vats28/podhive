// controllers/studioController.js
const Studio = require("../models/Studio");
const Availability = require("../models/Availability");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure tmp directory exists
const tmpDir = path.join(__dirname, "../tmp");
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

// Multer setup: store to a temp folder, ensure unique filenames
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, tmpDir),
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per file
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Helper: upload and clean temp images
const uploadImages = async (files) => {
  const uploaded = [];
  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "studios",
    });
    uploaded.push(result.secure_url);
    try {
      fs.unlinkSync(file.path);
    } catch (err) {
      // silent fail on cleanup
    }
  }
  return uploaded;
};

// controllers/studioController.js

// Parse JSON fields
const parseJsonFields = (body) => ({
  equipments: body.equipments ? JSON.parse(body.equipments) : [],
  packages: body.packages ? JSON.parse(body.packages) : [], // ← new
  addons: body.addons ? JSON.parse(body.addons) : [], // ← new
  location: body.location ? JSON.parse(body.location) : {},
  availability: body.availability ? JSON.parse(body.availability) : [],
  operationalHours: body.operationalHours
    ? JSON.parse(body.operationalHours)
    : {},
});

// Controller actions
const addStudio = async (req, res) => {
  try {
    const { name, description, pricePerHour } = req.body;
    let {
      equipments,
      packages,
      addons,
      location,
      availability,
      operationalHours,
    } = parseJsonFields(req.body);

    // Convert "HH:MM" to numeric hours
    if (operationalHours.start && operationalHours.end) {
      operationalHours = {
        start: parseInt(operationalHours.start.split(":")[0], 10),
        end: parseInt(operationalHours.end.split(":")[0], 10),
      };
    }

    // Upload images to Cloudinary & clean up tmp files
    const uploadedImages = await uploadImages(req.files || []);

    // Create the Studio document
    const studio = new Studio({
      name,
      description,
      author: req.user._id,
      equipments,
      images: uploadedImages,
      location,
      operationalHours,
      packages, // ← now included
      addons, // ← now included
      approved: false,
      pricePerHour: parseFloat(pricePerHour), // ← include if you’ve added this field
    });

    const createdStudio = await studio.save();

    // …then insert Availability slots exactly as before…
    if (availability.length) {
      const slots = availability.map((slot) => ({
        studio: createdStudio._id,
        date: slot.date,
        hour: slot.hour,
        isAvailable: slot.isAvailable ?? true,
      }));
      await Availability.insertMany(slots);
    }

    return res.status(201).json(createdStudio);
  } catch (error) {
    console.error("❌ addStudio error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getStudios = async (req, res) => {
  try {
    const studios = await Studio.find({ approved: true });
    const slots = await Availability.find({
      studio: { $in: studios.map((s) => s._id) },
    });
    const slotMap = slots.reduce((acc, s) => {
      const id = s.studio.toString();
      acc[id] = acc[id] || [];
      acc[id].push(s);
      return acc;
    }, {});
    return res.json(
      studios.map((studio) => ({
        ...studio.toObject(),
        availability: slotMap[studio._id.toString()] || [],
        ratingSummary: studio.ratingSummary || { average: 0, count: 0 },
      }))
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateStudio = async (req, res) => {
  try {
    // 1. Fetch and authorize
    const studio = await Studio.findById(req.params.id);
    if (!studio) return res.status(404).json({ message: "Not found" });
    if (!studio.approved)
      return res.status(403).json({ message: "Not approved" });
    if (studio.author.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    // 2. Handle images
    if (req.files?.length) {
      // replace with newly uploaded ones
      studio.images = await uploadImages(req.files);
    } else if (req.body.existingImages) {
      // or keep any URLs the front-end sent back
      studio.images = JSON.parse(req.body.existingImages);
    }

    // 3. Parse JSON fields (including packages & addons now)
    let {
      equipments,
      packages,
      addons,
      location,
      availability,
      operationalHours,
    } = parseJsonFields(req.body);

    // 4. Convert "start_time"/"end_time" to numeric .start/.end
    if (operationalHours.start_time && operationalHours.end_time) {
      operationalHours = {
        start: parseInt(operationalHours.start_time.split(":")[0], 10),
        end: parseInt(operationalHours.end_time.split(":")[0], 10),
      };
    }

    // 5. Simple scalars
    ["name", "description", "pricePerHour"].forEach((f) => {
      if (req.body[f] != null) studio[f] = req.body[f];
    });

    // 6. Deep fields & arrays
    Object.assign(studio, {
      equipments,
      packages,
      addons,
      location,
      operationalHours,
    });

    // 7. Availability: replace slots if any were sent
    if (availability.length) {
      await Availability.deleteMany({ studio: studio._id });
      const slots = availability.map((slot) => ({
        studio: studio._id,
        date: slot.date,
        hour: slot.hour,
        isAvailable: slot.isAvailable ?? true,
      }));
      await Availability.insertMany(slots);
    }

    // 8. Save and respond
    const updated = await studio.save();
    return res.json(updated);
  } catch (err) {
    console.error("❌ updateStudio error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
const deleteStudio = async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id);
    if (!studio) return res.status(404).json({ message: "Studio not found" });
    if (!studio.approved)
      return res.status(403).json({ message: "Studio not approved" });
    if (studio.author.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not authorized" });

    // Step 1: Delete all availability slots for this studio
    await Availability.deleteMany({ studio: studio._id });

    // Step 2: Delete images from Cloudinary (by extracting public ID from URL)
    if (studio.images?.length) {
      for (const url of studio.images) {
        try {
          const publicId = extractPublicIdFromUrl(url, "studios");
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (cloudErr) {
          console.warn(
            `⚠️ Cloudinary delete failed for ${url}:`,
            cloudErr.message
          );
        }
      }
    }

    // Step 3: Delete the studio itself
    await studio.deleteOne();

    return res.json({ message: "Studio removed successfully" });
  } catch (err) {
    console.error("❌ deleteStudio error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Helper to extract Cloudinary public ID from secure_url
function extractPublicIdFromUrl(url, folderName = "") {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname; // e.g., /v1709222596/studios/1719661018794-850423322.jpg
    const parts = pathname.split("/");

    // Find index of folder (e.g., "studios") and slice path from there
    const folderIndex = parts.findIndex((part) => part === folderName);
    if (folderIndex === -1 || folderIndex + 1 >= parts.length) return null;

    const filename = parts.slice(folderIndex + 1).join("/"); // supports subfolders too
    const publicId = filename.replace(/\.[^/.]+$/, ""); // remove extension
    return `${folderName}/${publicId}`;
  } catch (e) {
    console.error("Failed to extract Cloudinary public ID:", e.message);
    return null;
  }
}

// const deleteStudio = async (req, res) => {
//   try {
//     const studio = await Studio.findById(req.params.id);
//     if (!studio) return res.status(404).json({ message: "Not found" });
//     if (!studio.approved)
//       return res.status(403).json({ message: "Not approved" });
//     if (studio.author.toString() !== req.user._id.toString())
//       return res.status(401).json({ message: "Not authorized" });

//     await Availability.deleteMany({ studio: studio._id });
//     await studio.deleteOne();
//     return res.json({ message: "Studio removed" });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

module.exports = { upload, addStudio, getStudios, updateStudio, deleteStudio };
