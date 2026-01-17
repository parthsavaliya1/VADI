"use client";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StripePaymentForm({ amount, items }: { amount: number, items: any }) {
    const stripe = useStripe();
    const elements = useElements();
    const { clear } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();


    const handlePayment = async () => {
        if (!stripe || !elements) return;

        setLoading(true);
        setError("");

        const res = await fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });

        const { clientSecret } = await res.json();

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
            },
        });

        setLoading(false);

        if (result.error) {
            setError(result.error.message || "Payment failed");
            return;
        }

        if (result.paymentIntent?.status === "succeeded") {

            // 🔴 CREATE ORDER FIRST
            const orderRes = await fetch("/api/orders/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items,
                    total: amount,
                    paymentIntentId: result.paymentIntent.id,
                }),
            });

            if (!orderRes.ok) {
                setError("Order creation failed. Please contact support.");
                return;
            }

            // ✅ THEN redirect
            router.push("/checkout/success");
        }


    };

    return (
        <>
            <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

            <div className="border rounded-xl p-4 mb-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                            },
                        },
                    }}
                />
            </div>

            {error && (
                <p className="text-sm text-red-500 mb-4">{error}</p>
            )}

            <Button
                className="w-full h-12"
                onClick={handlePayment}
                disabled={loading}
            >
                {loading ? "Processing..." : "Pay Now"}
            </Button>
        </>
    );
}
