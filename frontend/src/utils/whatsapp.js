import axios from "axios";

const API_URL = "http://localhost:5000";

// Send WhatsApp via backend (which calls TextMeBot)
export const sendWhatsAppMessage = async (phone, message) => {
  try {
    const response = await axios.post(`${API_URL}/api/send-whatsapp`, {
      phone,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("WhatsApp send failed:", error);
    return { success: false, error: error.message };
  }
};

// Message templates
export const messages = {
  orderPlaced: (tokenNumber, stallName, customerName, items, totalAmount) =>
    `🎉 *Order Confirmed!*

Hey ${customerName}! Your order has been placed.

🎫 *Token:* #${tokenNumber}
🏪 *Stall:* ${stallName}
💰 *Total:* ₹${totalAmount}

📦 *Items:*
${items.map((item) => `• ${item.name} × ${item.quantity}`).join("\n")}

⏳ We're preparing your food. You'll get another message when it's ready!

_QueueLess - Skip the queue, not the food!_`,

  orderReady: (tokenNumber, stallName, customerName) =>
    `✅ *Your Food is Ready!*

Hey ${customerName}! 🎊

🎫 *Token:* #${tokenNumber}
🏪 *Collect from:* ${stallName}

🏃 Head to *${stallName}* now and show your token number to collect your order.

Don't keep your food waiting! 😋

_Thanks for using QueueLess!_`,

  orderPreparing: (tokenNumber, stallName, customerName) =>
    `👨‍🍳 *Order Update*

Hey ${customerName}!

Your order #${tokenNumber} is now being prepared at *${stallName}*.

Almost there! We'll notify you when it's ready for pickup. 🍳

_QueueLess - Skip the queue, not the food!_`,
};

// // CallMeBot WhatsApp API
// // User needs to activate first by sending:
// // "I allow callmebot to send me messages" to +34 644 71 81 99

// export const sendWhatsAppMessage = async (phone, message) => {
//   // Remove any non-numeric characters and ensure country code
//   let cleanPhone = phone.replace(/\D/g, "");
  
//   // Add India country code if not present
//   if (!cleanPhone.startsWith("91") && cleanPhone.length === 10) {
//     cleanPhone = "91" + cleanPhone;
//   }

//   const apiKey = "YOUR_CALLMEBOT_API_KEY"; // User gets this after activation
  
//   const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;

//   try {
//     const response = await fetch(url);
//     return { success: true };
//   } catch (error) {
//     console.error("WhatsApp send failed:", error);
//     return { success: false, error };
//   }
// };

// // Message templates
// export const messages = {
//   orderPlaced: (tokenNumber, stallName) =>
//     `🎉 *QueueLess Order Confirmed!*\n\n📝 Token: #${tokenNumber}\n🏪 Stall: ${stallName}\n\nWe'll notify you when your order is ready!\n\n_Skip the queue, not the food!_`,

//   orderReady: (tokenNumber, stallName) =>
//     `✅ *Your Order is Ready!*\n\n📝 Token: #${tokenNumber}\n🏪 Collect from: ${stallName}\n\n🏃 Please collect your order now!\n\n_Thank you for using QueueLess!_`,
// };