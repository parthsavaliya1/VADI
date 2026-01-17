import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";

export default async function OrdersPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;

    const { data: orders } = await supabaseAdmin
        .from("orders")
        .select(`
      id,
      total,
      created_at,
      order_items (
        id,
        name,
        quantity,
        price
      )
    `)
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen pt-28 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-display font-bold mb-8">
                    My Orders
                </h1>

                {orders?.length === 0 && (
                    <p className="text-muted-foreground">No orders yet.</p>
                )}

                <div className="space-y-6">
                    {orders?.map(order => (
                        <div
                            key={order.id}
                            className="bg-white p-6 rounded-2xl border"
                        >
                            <div className="flex justify-between mb-4 font-semibold">
                                <span>
                                    Order #{order.id.slice(0, 8)}
                                </span>
                                <span>
                                    ${(order.total / 100).toFixed(2)}
                                </span>
                            </div>

                            <ul className="space-y-2 text-sm">
                                {order.order_items.map(item => (
                                    <li key={item.id} className="flex justify-between">
                                        <span>
                                            {item.name} × {item.quantity}
                                        </span>
                                        <span>
                                            ${(item.price * item.quantity / 100).toFixed(2)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
