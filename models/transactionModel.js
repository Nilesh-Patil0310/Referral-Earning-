import mongoose from "mongoose";

// Schema for storing purchase transactions
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    valid: { type: Boolean, default: false }, // Transactions only valid if >1000 Rs
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
