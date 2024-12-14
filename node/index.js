const express = require("express");
require("dotenv").config();
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
app.post("/", (req, res) => {
  res.json({ hi: "hii" });
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
