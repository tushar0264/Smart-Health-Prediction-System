// File: backend/api-server/waiter_server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); // To talk to the 'Brain'
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. Connect to the Database (your order book) ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected.'))
  .catch(err => console.error('🔴 MongoDB connection error:', err));

// --- 2. Define the structure of a Report ---
const ReportSchema = new mongoose.Schema({
  title: String,
  date: { type: Date, default: Date.now },
  prediction: String, // "Fit" or "At Risk"
  details: { type: Map, of: String }, // To store symptoms
});
const Report = mongoose.model('Report', ReportSchema);


// --- 3. Create the Main Prediction Route ---
// Your website will send requests here.
app.post('/predict/heart', async (req, res) => {
  try {
    const symptoms = req.body; // Get symptoms from the website's form

    // Step A: Send symptoms to the Python 'Brain'
    const brainResponse = await axios.post(`${process.env.BRAIN_API_URL}/predict/heart`, symptoms);
    const rawPrediction = brainResponse.data.prediction_result; // This will be 0 or 1

    // Step B: Convert the simple prediction into a meaningful report
    const predictionText = (rawPrediction === 1) ? 'At Risk' : 'Fit';
    
    // You can add more details here
    const recommendations = (rawPrediction === 1) 
      ? 'Consult a doctor, maintain a low-sodium diet.' 
      : 'Maintain a healthy lifestyle and regular exercise.';

    // Step C: Save the full report to the database
    const newReport = new Report({
      title: 'Heart Disease Assessment',
      prediction: predictionText,
      details: { ...symptoms, recommendations },
    });
    await newReport.save();
    
    console.log('✅ Report saved to database.');

    // Step D: Send the complete, user-friendly report back to your website
    res.status(201).json(newReport);

  } catch (error) {
    console.error('🔴 Error during prediction:', error.message);
    res.status(500).json({ message: 'Something went wrong.' });
  }
});


// --- 4. Create Route to Get All Past Reports ---
app.get('/reports', async (req, res) => {
    try {
        const allReports = await Report.find().sort({ date: -1 }); // Get newest first
        res.json(allReports);
    } catch (error) {
        res.status(500).json({ message: 'Could not fetch reports.' });
    }
});


// --- 5. Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🗣️ Node.js 'Waiter' is running on http://localhost:${PORT}`);
});