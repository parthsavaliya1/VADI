import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Navbar } from "../components/Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-background leaf-pattern">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="text-center max-w-4xl mx-auto px-4 mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-primary mb-6"
          >
            Rooted in Nature
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            We believe that good food starts with good soil.
          </motion.p>
        </section>

        {/* Story Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-secondary/30 rounded-3xl transform -rotate-3 -z-10"></div>
              {/* farmer in field */}
              <img
                src="https://pixabay.com/get/g98ebc0654b7b018b570ce0680a7467c353e3fe1475bd7b33a4ab13335a6a516b38180362427d2b6b905f9c6aa2d464d76db429011c50bfb1f8b25772ccf54ac0_1280.jpg"
                alt="Farmer in field"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl font-display font-bold text-primary">
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2010, Pure Harvest began as a small family plot with
                a big dream: to restore the connection between people and the
                food they eat. What started with a handful of heirlooom tomatoes
                has grown into a thriving ecosystem of sustainable agriculture.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We practice regenerative farming, meaning we give back to the
                land more than we take. No synthetic fertilizers, no harmful
                pesticides—just hard work, compost, and respect for nature's
                cycles.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-primary text-primary-foreground py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                {
                  title: "Sustainability",
                  desc: "We nurture the soil so it can nurture us for generations to come.",
                },
                {
                  title: "Community",
                  desc: "We support local food systems and fair wages for all farm workers.",
                },
                {
                  title: "Transparency",
                  desc: "Know exactly where your food comes from and how it was grown.",
                },
              ].map((val, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                  <h3 className="text-xl font-bold font-display mb-4 text-accent">
                    {val.title}
                  </h3>
                  <p className="text-primary-foreground/80">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
