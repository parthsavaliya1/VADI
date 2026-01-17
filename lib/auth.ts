import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { supabaseAdmin } from "./supabase/supabase-admin";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "you@example.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const { data: user } = await supabaseAdmin
                    .from("users")
                    .select("*")
                    .eq("email", credentials.email)
                    .single();

                if (!user) return null;

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: `${user.first_name} ${user.last_name}`,
                };
            },
        }),
    ],

    // 🔥 ADD THIS
    pages: {
        signIn: "/login",   // optional (if you have a page)
        error: "/login",    // 🔑 THIS FIXES /api/auth/error redirect
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user && token.id) {
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
};
