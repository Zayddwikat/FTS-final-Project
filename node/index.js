const express = require("express");
require("dotenv").config();
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();
app.use(cors());
app.use(express.json());

const bodyParser = require("body-parser");
app.use(
  "/webhook",
  bodyParser.raw({ type: "application/json" }) // Parse the webhook body
);

app.post("/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // Webhook secret from Stripe dashboard
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent was successful!`, paymentIntent);
      // Perform post-payment actions (e.g., mark an order as paid)
      break;

    case "payment_intent.payment_failed":
      const failedPaymentIntent = event.data.object;
      console.log(
        `PaymentIntent failed: ${failedPaymentIntent.last_payment_error}`
      );
      // Handle failed payment
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

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
