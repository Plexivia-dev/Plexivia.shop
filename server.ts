import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily / safely
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!ai) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return ai;
}

const PRODUCTS_CONTEXT = `
You are the official Gemini AI Shopping Assistant for PLEXIVIA – Crafting Digital Dreams.
PLEXIVIA brand: Modern, minimal, futuristic, clean, elegant, technology-focused digital agency and lifestyle e-commerce store.
Brand colors: Dark Background (#0C1618), Primary Cyan (#58C1C3), Accent Green (#97CC6F), Primary White (#F5F7F7).

CRITICAL RULE:
You must ONLY discuss, recommend, and answer questions about the EXACT 15 products and 4 categories listed below.
Do NOT invent products, features, brands, or fake discounts.

THE 4 CATEGORIES AND 15 PRODUCTS:

Category: Bags
1. "Tote Bag" - ৳ 1,250 - Premium durable cotton canvas tote bag with clean aesthetic design.
2. "Nature Designed Tote Bag" - ৳ 1,250 - Eco-conscious botanical leaf print tote bag for everyday essentials.
3. "Ladies Purse" - ৳ 1,650 - Elegant structured vegan leather purse with refined hardware.
4. "Laptop Bag" - ৳ 2,250 - Sleek, protective commuter laptop carrier with padded interior compartment.
5. "Cute Schoolbag" - ৳ 1,850 - Ergonomic pastel aesthetic backpack with spacious multi-zip compartments.

Category: Wallet
6. "Kawaii Mini Purse" - ৳ 950 - Adorable compact mini zip pouch wallet for coins and cards.
7. "Coin Purse" - ৳ 750 - Minimalist pocket leather coin purse with quick snap closure.
8. "Men Wallet" - ৳ 1,250 - Classic bifold dark leather wallet with RFID-blocking card slots.
9. "Leather Long Wallet" - ৳ 1,750 - Slim full-grain textured long wallet with generous bill and card capacity.

Category: Keychains
10. "Cute Bunny Keychain" - ৳ 680 - Soft plush bunny rabbit charm with gold-tone carabiner ring.
11. "Kuromi Premium Plush" - ৳ 1,200 - High-grade collector plush charm with embroidered detailing.
12. "Black Cat Keychain Pendant" - ৳ 620 - Enamel and dark metal sleek black feline silhouette charm.

Category: Tshirts
13. "Hello Kitty Designed" - ৳ 1,450 - Soft premium combed cotton graphic tee with iconic motif.
14. "Couple Tshirt Pair" - ৳ 2,450 - Matching set of 2 premium minimalist unisex cotton tees.
15. "Jojo Soso Drop Shoulder" - ৳ 1,650 - Oversized boxy streetwear drop-shoulder heavyweight tee.

TONE & STYLE:
- Polite, concise, stylish, modern, helpful.
- Keep replies under 3-4 sentences unless detailed comparisons are requested.
- If asked about ordering, mention they can click "Add to Cart" or visit Checkout.
- If asked about custom web development or agency services, suggest clicking "View Demo" to book an appointment on Google Calendar or "Chat on WhatsApp".
`;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "PLEXIVIA E-Commerce" });
});

// Gemini AI Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const client = getGeminiClient();

    if (!client) {
      // Fallback local intelligence when GEMINI_API_KEY is not configured
      const lower = message.toLowerCase();
      let reply = "Welcome to PLEXIVIA! I can help you discover our 4 curated categories: Bags, Wallets, Keychains, and T-shirts. Which collection would you like to explore?";

      if (lower.includes("bag") || lower.includes("tote") || lower.includes("purse") || lower.includes("schoolbag")) {
        reply = "In our Bags collection, we have the classic Tote Bag (৳ 1,250), Nature Designed Tote Bag (৳ 1,250), Ladies Purse (৳ 1,650), Laptop Bag (৳ 2,250), and Cute Schoolbag (৳ 1,850). Each is crafted for style and durability!";
      } else if (lower.includes("wallet") || lower.includes("coin")) {
        reply = "Our Wallet category features the Kawaii Mini Purse (৳ 950), Coin Purse (৳ 750), Men Wallet (৳ 1,250), and Leather Long Wallet (৳ 1,750).";
      } else if (lower.includes("keychain") || lower.includes("plush") || lower.includes("cat") || lower.includes("bunny") || lower.includes("kuromi")) {
        reply = "Our Keychains collection includes the Cute Bunny Keychain (৳ 680), Kuromi Premium Plush (৳ 1,200), and Black Cat Keychain Pendant (৳ 620).";
      } else if (lower.includes("tshirt") || lower.includes("shirt") || lower.includes("tee") || lower.includes("kitty") || lower.includes("drop shoulder")) {
        reply = "In T-shirts, we offer the Hello Kitty Designed (৳ 1,450), Couple Tshirt Pair (৳ 2,450), and Jojo Soso Drop Shoulder tee (৳ 1,650).";
      } else if (lower.includes("demo") || lower.includes("meeting") || lower.includes("agency") || lower.includes("website")) {
        reply = "Plexivia is crafting digital dreams! You can click the 'View Demo' button to schedule a call with us via Google Calendar, or reach out directly on WhatsApp.";
      }

      return res.json({ reply });
    }

    // Prepare contents with conversation history
    const formattedContents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) {
        if (item.sender === "user" && item.text) {
          formattedContents.push({ role: "user", parts: [{ text: item.text }] });
        } else if (item.sender === "bot" && item.text) {
          formattedContents.push({ role: "model", parts: [{ text: item.text }] });
        }
      }
    }

    formattedContents.push({ role: "user", parts: [{ text: message }] });

    const response = await client.models.generateContent({
      model: "gemini-3.8-flash",
      contents: formattedContents,
      config: {
        systemInstruction: PRODUCTS_CONTEXT,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I am here to assist you with products from our curated collection.";
    return res.json({ reply });
  } catch (error: unknown) {
    console.error("Gemini Chat API Error:", error);
    return res.status(500).json({
      reply: "I'm experiencing a brief connection hiccup. Feel free to browse our 15 featured items across Bags, Wallets, Keychains, and T-shirts!",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Setup Vite dev server or static file serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PLEXIVIA server listening on port ${PORT}`);
  });
}

startServer();
