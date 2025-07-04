const Availability = require("../models/Availability");

// GET available slots for a studio
const getAvailableSlots = async (req, res) => {
  const { studioId } = req.params;

  try {
    const availableSlots = await Availability.find({
      studio: studioId,
      isAvailable: true,
    }).sort({ date: 1 });

    res.json(availableSlots);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Failed to fetch availability" });
  }
};

module.exports = { getAvailableSlots };
