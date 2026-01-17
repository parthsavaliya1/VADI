import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // see step below
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { items, total } = await req.json();

    // 1. Create order
    const { data: order, error } = await supabaseAdmin
        .from("orders")
        .insert({
            user_id: session.user.id,
            total,
            status: "paid",
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Insert order items
    const orderItems = items.map((item: any) => ({
        order_id: order.id,
        product_id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
    }));

    await supabaseAdmin.from("order_items").insert(orderItems);

    return NextResponse.json({ orderId: order.id });
}
