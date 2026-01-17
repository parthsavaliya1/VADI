"use client";

import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "../components/StripeForm";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
    const { items, total } = useCart();
    const { status } = useSession();
    const [step, setStep] = useState<1 | 2>(1);

    if (status === "unauthenticated") redirect("/login");
    if (items.length === 0) redirect("/shop");

    return (
        <div className="min-h-screen pt-28 pb-20">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl border">

                {/* STEP 1: ADDRESS */}
                {step === 1 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input placeholder="First name" />
                            <Input placeholder="Last name" />
                            <Input placeholder="Phone" />
                            <Input placeholder="Address" className="md:col-span-2" />
                            <Input placeholder="City" />
                            <Input placeholder="State" />
                            <Input placeholder="Postal code" />
                        </div>

                        <Button
                            className="mt-6 w-full h-12"
                            onClick={() => setStep(2)}
                        >
                            Continue to Payment
                        </Button>
                    </>
                )}

                {/* STEP 2: STRIPE FORM */}
                {step === 2 && (
                    <Elements stripe={stripePromise}>
                        <StripePaymentForm amount={Math.round(total * 100)} items={items}
                        />
                    </Elements>
                )}
            </div>
        </div>
    );
}
