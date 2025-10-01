import axios from "axios";

export async function sendWhatsAppMessage(to, message) {
  try {
    await axios.post(process.env.BIZMAGNETS_API, {
      to,
      message
    });
    console.log("✅ WhatsApp message sent:", message);
  } catch (err) {
    console.error("❌ WhatsApp send failed:", err.message);
  }
}
