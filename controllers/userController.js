import userModel from "../models/userModel.js";

// Create a new user with optional referrer
export const createUser = async (req, res) => {
  const { name, referrerId } = req.body;

  try {
    const referrer = await User.findById(referrerId);
    if (referrer && referrer.referralCount >= 8) {
      return res.status(400).json({ message: "Referral limit exceeded" });
    }

    const user = new User({ name, referrerId });
    await user.save();

    if (referrer) {
      referrer.referralCount++;
      await referrer.save();
    }

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
