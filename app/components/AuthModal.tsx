"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const logo = "/images/vadi.png";

export function AuthModal({ onSuccess }: { onSuccess: () => void }) {
    const [mode, setMode] = useState<"login" | "signup" | "success">("login");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Signup fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [accepted, setAccepted] = useState(false);

    // Login fields
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleSignup = async () => {
        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        if (!accepted) {
            setError("Please accept Terms & Conditions");
            return;
        }

        setLoading(true);
        setError("");

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.error || "Signup failed");
            return;
        }

        setMode("success");
    };

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            email: loginEmail,
            password: loginPassword,
            redirect: false,
        });

        setLoading(false);

        if (res?.error) {
            setError("Invalid email or password");
            return;
        }

        onSuccess();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl w-full max-w-md p-8">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="VADI" className="w-16 h-16" />
                </div>

                {/* SUCCESS */}
                {mode === "success" && (
                    <>
                        <h2 className="text-2xl font-display font-bold text-center mb-4">
                            Signup Successful 🎉
                        </h2>
                        <p className="text-center text-muted-foreground mb-6">
                            Your account has been created. Please login to continue.
                        </p>
                        <Button
                            className="w-full rounded-full"
                            onClick={() => setMode("login")}
                        >
                            Go to Login
                        </Button>
                    </>
                )}

                {/* LOGIN */}
                {mode === "login" && (
                    <>
                        <h2 className="text-2xl font-display font-bold text-center mb-2">
                            Welcome Back
                        </h2>

                        <Input
                            placeholder="Email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />

                        <Input
                            type="password"
                            placeholder="Password"
                            className="mt-3"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />

                        {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}

                        <Button
                            className="w-full mt-5 rounded-full"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                        <p className="text-sm text-center mt-4">
                            New to VADI?{" "}
                            <button
                                onClick={() => setMode("signup")}
                                className="text-primary font-semibold underline"
                            >
                                Create account
                            </button>
                        </p>
                    </>
                )}

                {/* SIGNUP */}
                {mode === "signup" && (
                    <>
                        <h2 className="text-2xl font-display font-bold text-center mb-4">
                            Create Account
                        </h2>

                        <div className="grid grid-cols-2 gap-3">
                            <Input placeholder="First name" onChange={e => setFirstName(e.target.value)} />
                            <Input placeholder="Last name" onChange={e => setLastName(e.target.value)} />
                        </div>

                        <Input
                            className="mt-3"
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Input
                            type="password"
                            className="mt-3"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />

                        <Input
                            type="password"
                            className="mt-3"
                            placeholder="Confirm password"
                            onChange={e => setConfirm(e.target.value)}
                        />

                        <label className="flex items-center gap-2 mt-4 text-sm">
                            <input
                                type="checkbox"
                                checked={accepted}
                                onChange={(e) => setAccepted(e.target.checked)}
                            />
                            I agree to the Terms & Conditions
                        </label>

                        {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}

                        <Button
                            className="w-full mt-5 rounded-full"
                            onClick={handleSignup}
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </Button>

                        <p className="text-sm text-center mt-4">
                            Already have an account?{" "}
                            <button
                                onClick={() => setMode("login")}
                                className="text-primary font-semibold underline"
                            >
                                Login
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
