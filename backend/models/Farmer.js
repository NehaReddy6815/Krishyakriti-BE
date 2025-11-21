import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema({
  name: String,
  location: String,
  phone: String
});

export default mongoose.model("Farmer", FarmerSchema);
