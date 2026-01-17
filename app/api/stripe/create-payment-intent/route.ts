import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
        amount, // in cents
        currency: "usd",
        automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
    });
}
