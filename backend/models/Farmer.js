import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema({
  farmerId: { type: Number, unique: true, index: true },
  name: { type: String, required: true },
  location: { type: String },
  phone: { type: String, index: true }
}, { timestamps: true });

// Ensure indexes are created
FarmerSchema.plugin(function(schema) {
  schema.index({ farmerId: 1 }, { unique: true });
});

export default mongoose.models.Farmer || mongoose.model("Farmer", FarmerSchema);
