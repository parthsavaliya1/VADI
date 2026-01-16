import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";

export async function POST(req: Request) {
    const { firstName, lastName, email, password } = await req.json();

    if (!firstName || !lastName || !email || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const { error } = await supabaseAdmin.from("users").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashed,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
}
