"use client";

import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { signIn } from "next-auth/react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {
        await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-6">Create Account</h1>

                <Input placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <Input
                    type="password"
                    placeholder="Password"
                    className="mt-3"
                    onChange={e => setPassword(e.target.value)}
                />

                <Button className="w-full mt-6" onClick={signup}>
                    Sign Up
                </Button>
            </div>
        </div>
    );
}
