const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "QueueLess API is running 🚀" });
});

// Send WhatsApp notification
app.post("/api/send-whatsapp", async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ 
      success: false, 
      error: "Phone and message are required" 
    });
  }

  // Clean phone number - ensure it has country code
  let cleanPhone = phone.replace(/\D/g, "");
  if (!cleanPhone.startsWith("91") && cleanPhone.length === 10) {
    cleanPhone = "91" + cleanPhone;
  }

  const apiKey = process.env.CALLMEBOT_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      success: false, 
      error: "API key not configured" 
    });
  }

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;
    
    const response = await axios.get(url);
    
    console.log(`✅ WhatsApp sent to ${cleanPhone}`);
    
    res.json({ 
      success: true, 
      message: "WhatsApp notification sent!" 
    });
  } catch (error) {
    console.error("❌ WhatsApp send failed:", error.message);
    
    res.status(500).json({ 
      success: false, 
      error: "Failed to send WhatsApp notification" 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});