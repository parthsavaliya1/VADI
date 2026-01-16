"use client";
import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Recycle, MapPin, Sprout, Heart } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
const aboutImage = "/images/farmer.jpg";

export default function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const values = [
    {
      icon: ShieldCheck,
      title: "Purity First",
      description: "We believe in the absolute purity of nature. Our products are grown without synthetic pesticides, herbicides, or GMOs."
    },
    {
      icon: Leaf,
      title: "Natural Farming",
      description: "Our farming practices honor the land. We use regenerative techniques that nourish the soil and respect local ecosystems."
    },
    {
      icon: MapPin,
      title: "Full Traceability",
      description: "Know exactly where your food comes from. Every product can be traced back to the specific field where it was harvested."
    },
    {
      icon: Recycle,
      title: "Eco-Friendly",
      description: "Sustainability is at our core. From water conservation to biodegradable packaging, we minimize our footprint."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
              alt="Lush green farm field"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center text-white px-4"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6">
              Our Legacy
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Rooted in Nature</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90 font-light leading-relaxed">
              Cultivating a healthier future through sustainable agriculture and a deep respect for the Earth.
            </p>
          </motion.div>
        </section>

        {/* Our Story */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeIn}>
                <h2 className="text-4xl font-display font-bold text-primary mb-8">The Pure Harvest Story</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Founded in the heart of the countryside, Pure Harvest began as a simple dream: to bring the true taste of nature back to our community. We saw how industrial farming was changing the landscape and the quality of our food, and we decided to take a different path.
                  </p>
                  <p>
                    Today, we manage over 500 acres of certified organic land. Our journey is one of patience and persistence—waiting for the soil to recover, learning from the seasons, and working in harmony with local wildlife.
                  </p>
                  <div className="flex items-center gap-4 text-primary font-display font-bold italic pt-4">
                    <Heart className="w-6 h-6 text-accent" />
                    <span>"Nature does not hurry, yet everything is accomplished."</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...fadeIn}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={aboutImage}
                    alt="Farmer holding fresh vegetables"
                    className="w-full h-full object-cover bg-white"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary/50 rounded-full blur-3xl -z-10" />
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-secondary/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-display font-bold text-primary mb-6">Our Commitments</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide every seed we plant and every harvest we share with you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  {...fadeIn}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-primary/5"
                >
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-4">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Traceability Banner */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <motion.div {...fadeIn}>
              <Sprout className="w-12 h-12 mx-auto mb-8 opacity-50" />
              <h2 className="text-4xl font-display font-bold mb-8">From Farm to Your Table</h2>
              <p className="text-xl opacity-80 mb-12 font-light italic">
                "We believe that transparency is the bridge between the farm and your kitchen. Every product we sell is a promise of quality and honesty."
              </p>
              <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
                <div>
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-sm opacity-60">Organic Certified</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Local</div>
                  <div className="text-sm opacity-60">Sourced Locally</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Fresh</div>
                  <div className="text-sm opacity-60">Picked Daily</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
