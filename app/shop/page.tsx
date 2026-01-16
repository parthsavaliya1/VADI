"use client";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { Loader2, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { STATIC_PRODUCTS } from "../../lib/data";

const CATEGORIES = ["All", "Vegetables", "Fruits", "Dairy & Eggs", "Honey & Jams", "Grains"];



export default function Shop() {
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const products = STATIC_PRODUCTS;
    const isLoading = false;
    const error = null;


    const searchParams = new URLSearchParams(window.location.search);
    const urlCategory = searchParams.get("category");

    if (urlCategory && filter === "All" && CATEGORIES.includes(urlCategory)) {
        setFilter(urlCategory);
    }

    const filteredProducts =
        products.filter((p) => {
            const categoryMatch = filter === "All" || p.category === filter;
            const searchMatch =
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchMatch;
        });


    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-20">
                {/* Hero Header */}
                <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000&auto=format&fit=crop"
                            className="w-full h-full object-cover"
                            alt="Farm field"
                        />
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    </div>
                    <div className="relative z-10 text-center text-white px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-display font-bold mb-4"
                        >
                            Our Harvest
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl max-w-2xl mx-auto opacity-90 font-light"
                        >
                            Discover the freshest organic produce from our sustainable fields
                        </motion.p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-border/50">
                        {/* Controls Bar */}
                        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-12">
                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {CATEGORIES.map((cat) => (
                                    <Button
                                        key={cat}
                                        variant={filter === cat ? "default" : "ghost"}
                                        onClick={() => setFilter(cat)}
                                        className={`rounded-full px-6 h-11 transition-all duration-300 ${filter === cat
                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                            : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                                            }`}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>

                            {/* Search Bar */}
                            <div className="relative w-full lg:max-w-sm">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search our collection..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-11 h-12 rounded-full border-border/50 focus:border-primary bg-secondary/20 border-none shadow-inner"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Results Info */}
                        <div className="mb-8 flex items-center justify-between">
                            <p className="text-muted-foreground font-medium">
                                Showing <span className="text-primary font-bold">{filteredProducts.length}</span> products
                                {filter !== "All" && <span> in <span className="text-primary">{filter}</span></span>}
                            </p>
                        </div>

                        {/* Grid */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className="aspect-[3/4] bg-secondary/20 rounded-2xl animate-pulse" />
                                ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
                                <p className="text-red-500 font-medium">Failed to load products. Please try again later.</p>
                            </div>
                        ) : (
                            <>
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10"
                                >
                                    {filteredProducts.map((product: any) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {filteredProducts.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-32 rounded-3xl bg-secondary/10 border border-dashed border-border/50"
                                    >
                                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                            <Search className="w-8 h-8 text-muted-foreground opacity-30" />
                                        </div>
                                        <h3 className="text-2xl font-display font-bold text-primary mb-2">No results found</h3>
                                        <p className="text-muted-foreground max-w-sm mx-auto">
                                            We couldn't find any products matching your current filters or search term.
                                        </p>
                                        <Button
                                            variant="link"
                                            onClick={() => { setFilter("All"); setSearchTerm(""); }}
                                            className="mt-6 text-primary font-bold"
                                        >
                                            Reset all filters
                                        </Button>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
