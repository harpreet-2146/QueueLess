// CallMeBot WhatsApp API
// User needs to activate first by sending:
// "I allow callmebot to send me messages" to +34 644 71 81 99

export const sendWhatsAppMessage = async (phone, message) => {
  // Remove any non-numeric characters and ensure country code
  let cleanPhone = phone.replace(/\D/g, "");
  
  // Add India country code if not present
  if (!cleanPhone.startsWith("91") && cleanPhone.length === 10) {
    cleanPhone = "91" + cleanPhone;
  }

  const apiKey = "YOUR_CALLMEBOT_API_KEY"; // User gets this after activation
  
  const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    return { success: true };
  } catch (error) {
    console.error("WhatsApp send failed:", error);
    return { success: false, error };
  }
};

// Message templates
export const messages = {
  orderPlaced: (tokenNumber, stallName) =>
    `🎉 *QueueLess Order Confirmed!*\n\n📝 Token: #${tokenNumber}\n🏪 Stall: ${stallName}\n\nWe'll notify you when your order is ready!\n\n_Skip the queue, not the food!_`,

  orderReady: (tokenNumber, stallName) =>
    `✅ *Your Order is Ready!*\n\n📝 Token: #${tokenNumber}\n🏪 Collect from: ${stallName}\n\n🏃 Please collect your order now!\n\n_Thank you for using QueueLess!_`,
};