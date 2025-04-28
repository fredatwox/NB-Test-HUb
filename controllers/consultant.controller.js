
import { consultantModel } from '../models/consultant.js';



// Register a new consultant
export const registerConsultant = async (req, res) => {
  const { name, email, expertise } = req.body;

  try {
    const consultantExists = await consultantModel.findOne({ email });
    if (consultantExists) {
      return res.status(400).json({ message: 'Consultant already exists' });
    }

    const newConsultant = new consultantModel({
      name,
      email,
      expertise,
    });

    await newConsultant.save();
    res.status(201).json({ message: 'Consultant registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all consultants
export const getConsultants = async (req, res) => {
  try {
    const consultants = await consultantModel.find();
    res.json(consultants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


