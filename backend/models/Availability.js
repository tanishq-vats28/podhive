// models/Availability.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const AvailabilitySchema = new Schema(
  {
    studio: { type: Schema.Types.ObjectId, ref: "Studio", required: true },
    date: { type: Date, required: true },
    hour: { type: Number, required: true, min: 0, max: 23 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ensure each studio/date/hour is unique
AvailabilitySchema.index({ studio: 1, date: 1, hour: 1 }, { unique: true });

module.exports = mongoose.model("Availability", AvailabilitySchema);
