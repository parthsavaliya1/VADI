"use client";

import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function CheckoutSuccessPage() {
    const { clear } = useCart();

    useEffect(() => {
        clear(); // clear cart only once on success
    }, [clear]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center border border-border shadow-sm">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />

                <h1 className="text-3xl font-display font-bold mb-3">
                    Payment Successful
                </h1>

                <p className="text-muted-foreground mb-8">
                    Thank you for your order. Your payment has been processed successfully.
                </p>

                <div className="flex gap-4 justify-center">
                    <Link href="/shop">
                        <Button>Continue Shopping</Button>
                    </Link>
                    <Link href="/">
                        <Button variant="outline">Go Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
