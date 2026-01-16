"use client";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Truck, ShieldCheck, Sprout } from "lucide-react";
import { ProductCard } from "./components/ProductCard";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import Link from "next/link";
import { ContactMessage, contactMessageSchema } from "../schema/schema";
import { useContactForm } from "../hooks/use-products";
import { STATIC_PRODUCTS } from "@/lib/data";

const logo = "/images/vadi.png";

export default function Home() {
  const products = STATIC_PRODUCTS;
  const isLoading = false;

  const featuredProducts = products.filter(
    (product) => product.isFeatured
  );

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 leaf-pattern" />

      <Navbar />

      <main className="relative z-10 pt-20">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
          {/* Decorative Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[100px] -z-10" />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium border border-primary/10">
                <Sprout className="w-4 h-4 mr-2" />
                100% Organic & Locally Sourced
              </div>

              <h1 className="text-5xl md:text-7xl font-display font-bold text-primary leading-tight">
                Fresh From <br />
                <span className="text-accent italic">Our Farm</span> To <br />
                Your Table
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Experience the taste of nature with our hand-picked,
                sustainable, and chemically-free produce delivered straight to
                your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/shop">
                  <Button
                    size="lg"
                    className="rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                  >
                    Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 text-lg h-14 border-primary text-primary hover:bg-primary/5"
                  >
                    Our Story
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10">
                {/* Unsplash image of vegetables/farm */}
                {/* fresh vegetables basket on wood table */}
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
                  alt="Fresh Vegetables"
                  className="rounded-3xl shadow-2xl object-cover w-full h-[600px]"
                />

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-border/50 max-w-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">
                        Certified Organic
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Quality you can trust
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-white/50 border-y border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Leaf,
                  title: "100% Organic",
                  desc: "No pesticides, no chemicals. Just pure nature.",
                },
                {
                  icon: Truck,
                  title: "Fast Delivery",
                  desc: "From our fields to your door in 24 hours.",
                },
                {
                  icon: ShieldCheck,
                  title: "Quality Guaranteed",
                  desc: "If you're not satisfied, we'll replace it.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center p-6"
                >
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-display font-bold text-primary mb-4">
                  Seasonal Favorites
                </h2>
                <p className="text-muted-foreground">
                  Picked fresh just for you.
                </p>
              </div>
              <Link href="/shop">
                <Button
                  variant="link"
                  className="text-primary font-bold text-lg hover:no-underline group"
                >
                  View All Products{" "}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-96 bg-gray-100 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
                {featuredProducts.length === 0 && (
                  <div className="col-span-4 text-center py-12 text-muted-foreground">
                    No featured products available at the moment.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          {/* Background texture overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Shop by Category
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto">
                Explore our wide range of products categorized for your
                convenience.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Vegetables",
                  image:
                    "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=500",
                },
                {
                  name: "Fruits",
                  image:
                    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500",
                },
                {
                  name: "Dairy & Eggs",
                  image:
                    "https://images.unsplash.com/photo-1627485937980-221c88ac04f9?w=500",
                },
                {
                  name: "Honey & Jams",
                  image:
                    "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500",
                },
              ].map((cat) => (
                <Link key={cat.name} href={`/shop?category=${cat.name}`}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <div className="aspect-square rounded-full overflow-hidden border-4 border-white/20 mb-4 mx-auto w-full max-w-[200px]">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-center text-xl font-bold font-display">
                      {cat.name}
                    </h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}

function NewsletterSection() {
  const { mutate, isPending } = useContactForm();

  const form = useForm<ContactMessage>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      name: "Newsletter Subscriber", // Hidden field default
      message: "Please subscribe me to the newsletter!", // Hidden field default
      email: "",
    },
  });

  const onSubmit = (data: ContactMessage) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-md">
          <img src={logo} alt="Logo" className="w-12 h-12" />
        </div>

        <h2 className="text-4xl font-display font-bold text-primary mb-6">
          Join Our Community
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">
          Subscribe to our newsletter for exclusive offers, seasonal recipes,
          and farming updates.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
        >
          <Input
            {...form.register("email")}
            placeholder="Enter your email address"
            className="h-12 rounded-full px-6 border-2 focus:border-primary bg-white text-lg"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-lg shadow-lg"
          >
            {isPending ? "Joining..." : "Subscribe"}
          </Button>
        </form>
        {form.formState.errors.email && (
          <p className="text-red-500 mt-2 text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>


    </section>
  );
}
