"use client";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
import type { ContactMessage } from "../schema/schema";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactMessage>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactMessage) => {
    console.log("Form Data:", data);

    // Example: send to API or Supabase
    // await supabase.from("contact_messages").insert(data);

    reset();
  };

  return (
    <div className="min-h-screen bg-background leaf-pattern">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h1 className="text-5xl font-display font-bold text-primary">
                Get in Touch
              </h1>
              <p className="text-muted-foreground text-lg">
                Have a question about our products or delivery?
              </p>

              <div className="space-y-6">
                <InfoItem
                  icon={<MapPin />}
                  title="Visit the Farm"
                  text="123 Green Valley Road"
                />
                <InfoItem
                  icon={<Phone />}
                  title="Call Us"
                  text="(555) 123-4567"
                />
                <InfoItem
                  icon={<Mail />}
                  title="Email Us"
                  text="hello@pureharvest.com"
                />
              </div>
            </div>

            {/* Form */}
            <Card className="border-none shadow-2xl shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl font-display text-primary">
                  Send a Message
                </CardTitle>
                <CardDescription>
                  We'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      {...register("email", { required: "Email is required" })}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Textarea
                      {...register("message", {
                        required: "Message is required",
                      })}
                      placeholder="How can we help?"
                      className="min-h-[150px]"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg bg-primary"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* =========================
   Small Helper Component
========================= */

function InfoItem({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center text-primary">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
