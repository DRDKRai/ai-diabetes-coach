import express from "express";
import dotenv from "dotenv";
import { supabase } from "./supabaseClient.js";
import { sendWhatsAppMessage } from "./whatsappBot.js";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.send("AI Diabetes Coach is running ✅");
});

// ✅ Webhook for WhatsApp events
app.post("/webhook", async (req, res) => {
  const { phone, message } = req.body;

  // Save new patient if not exists
  const { data: existing } = await supabase
    .from("patients")
    .select("*")
    .eq("phone", phone);

  if (!existing.length) {
    await supabase.from("patients").insert([{ phone, name: "New Patient" }]);
  }

  // Send AI reply
  const reply = `👋 Hi! I'm your AI Diabetes Coach. Thanks for joining.`;

  await sendWhatsAppMessage(phone, reply);

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

);
