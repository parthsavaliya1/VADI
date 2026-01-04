"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star, Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useState } from "react";
import { ProductQuickView } from "./ProductQuickView";
import { Product } from "../schema/schema";
// import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  //   const { addItem } = useCart();

  const handleQuickAdd = () => {
    // addItem(product, 1);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="group relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
      >
        {/* Image Container */}
        <div className="aspect-[4/3] overflow-hidden relative bg-muted">
          {product.isFeatured && (
            <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground hover:bg-accent/90 border-none shadow-sm">
              Featured
            </Badge>
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Quick Action Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
          >
            <Button
              size="sm"
              className="bg-white text-primary hover:bg-primary hover:text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
              onClick={() => {
                setSelectedProduct(product);
                setQuickViewOpen(true);
              }}
            >
              <Eye className="w-5 h-5" />
            </Button>
            <Button
              size="sm"
              className="bg-primary text-white hover:bg-primary/90 rounded-full px-4 gap-2 shadow-lg"
              onClick={handleQuickAdd}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <Badge
              variant="secondary"
              className="bg-secondary/30 text-primary-foreground hover:bg-secondary/50 font-normal"
            >
              {product.category}
            </Badge>
            <div className="flex items-center text-accent">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs ml-1 font-medium">4.9</span>
            </div>
          </div>

          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="font-sans font-bold text-lg text-primary">
              ${(product.price / 100).toFixed(2)}
            </span>
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                In Stock
              </span>
            ) : (
              <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full font-medium">
                Sold Out
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <ProductQuickView
        product={selectedProduct}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
}
