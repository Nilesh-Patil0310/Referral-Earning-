import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import Earnings from "../models/earningModel.js";

// Create a transaction and calculate earnings if valid
export const createTransaction = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const transaction = new Transaction({
      userId,
      amount,
      valid: amount > 1000, // Only valid if amount > 1000 Rs
    });

    await transaction.save();

    if (transaction.valid) {
      await calculateEarnings(transaction);
    }

    res.status(201).json({ message: "Transaction created", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Recursive function to calculate earnings for up to 2 levels
const calculateEarnings = async (transaction) => {
  let referrerId = transaction.userId; // Start with the user
  let level = 1;

  while (referrerId && level <= 2) {
    const referrer = await User.findById(referrerId);
    if (!referrer || !referrer.isActive) break;

    const percentage = level === 1 ? 0.05 : 0.01; // 5% for Level 1, 1% for Level 2
    const earnings = transaction.amount * percentage;

    await Earnings.create({
      userId: referrer._id,
      amount: earnings,
      level,
      transactionId: transaction._id,
    });

    referrerId = referrer.referrerId; // Move up the referral chain
    level++;
  }
};
