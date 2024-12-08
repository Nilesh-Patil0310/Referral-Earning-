import mongoose from "mongoose";

// Schema for tracking earnings from referrals
const earningsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    level: { type: Number, required: true }, 
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  },
  { timestamps: true }
);

export default mongoose.model("Earnings", earningsSchema);
