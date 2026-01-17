"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CartSidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
    const { items, removeItem, updateQuantity, total, clear } = useCart();
    const router = useRouter();


    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-[400px] flex flex-col">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Your Cart ({items.length})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6 space-y-4">
                    {items.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12 text-muted-foreground"
                        >
                            <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>Your cart is empty</p>
                            <p className="text-sm mt-2">Add items from the shop to get started!</p>
                        </motion.div>
                    ) : (
                        items.map((item, index) => (
                            <motion.div
                                key={item.product.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex gap-4 p-4 bg-secondary/30 rounded-lg"
                            >
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">{item.product.name}</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        ${(item.product.price / 100).toFixed(2)}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.product.id, item.quantity - 1)
                                            }
                                            className="px-2 py-1 bg-white rounded hover:bg-muted text-sm"
                                        >
                                            −
                                        </button>
                                        <span className="w-6 text-center text-sm font-semibold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item.product.id, item.quantity + 1)
                                            }
                                            className="px-2 py-1 bg-white rounded hover:bg-muted text-sm"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeItem(item.product.id)}
                                            className="ml-auto text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-t border-border pt-4 space-y-4"
                    >
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                        <Button
                            className="w-full bg-primary hover:bg-primary/90 text-white h-12"
                            onClick={() => {
                                onOpenChange(false);
                                router.push("/checkout");
                            }}
                        >
                            Checkout
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => clear()}
                        >
                            Clear Cart
                        </Button>
                    </motion.div>
                )}
            </SheetContent>
        </Sheet>
    );
}
