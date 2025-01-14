import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ReactFragment, useEffect, useState } from "react";
import { Button } from "../../../login/loginForm/loginButton";
import { PaymentIntent } from "@stripe/stripe-js";
import { useNavigate, useNavigation } from "react-router-dom";

export const CheckOutPage: React.FC<any> = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: amount * 100 }), // amount in cents
          }
        );

        const data = await response.json();

        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setLoading(false);
        } else {
          setErrorMessage("Failed to create Payment Intent");
        }
      } catch (error) {
        setErrorMessage("An error occurred while processing the payment.");
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, [amount]);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || loading || !clientSecret) {
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/Home",
      },
    });

    if ("error" in result) {
      setErrorMessage(
        result.error.message || "An error occurred during payment."
      );
      setLoading(false);
    } else {
      navigate("/Home");
    }
  };

  return (
    <form
      className="flex flex-col self-end items-center w-full gap-4"
      onSubmit={handleSubmit}
    >
      {clientSecret && !loading ? (
        <Elements stripe={stripe} options={{ clientSecret }}>
          <PaymentElement />
        </Elements>
      ) : (
        <div>Loading payment form...</div>
      )}
      <Button
        primary
        handleClick={(e: React.FormEvent) => handleSubmit(e)}
        isSubmitting={loading}
        value={loading ? "Loading..." : `Pay $${amount}`}
        size="small"
        children={null}
        className=""
        color="blue"
      />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </form>
  );
};
