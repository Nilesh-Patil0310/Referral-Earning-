import Earnings from "../models/earningModel.js";

// Fetch all earnings for a specific user
export const getEarnings = async (req, res) => {
  const { userId } = req.params;

  try {
    const earnings = await Earnings.find({ userId });
    res.status(200).json({ earnings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
