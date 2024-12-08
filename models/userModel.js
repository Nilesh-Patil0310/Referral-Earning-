import mongoose from "mongoose";

// Schema for storing user data and their referral relationships
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    referrerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    referralCount: { type: Number, default: 0 }, 
    isActive: { type: Boolean, default: true }, 
  },
  { timestamps: true }
); 

export default mongoose.model("User", userSchema);
