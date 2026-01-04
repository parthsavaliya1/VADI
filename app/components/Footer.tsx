"use client";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const logo = "/images/vadi.png";

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t border-primary/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer mb-4">
                <img src={logo} alt="Pure Harvest" className="h-10 w-auto" />
                <span className="font-display text-xl font-bold text-primary">
                  Pure Harvest
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Bringing the freshest, organic produce directly from our local
              fields to your family's table. Sustainable farming for a better
              future.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-primary">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/shop"
                  className="hover:text-primary transition-colors"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-primary">
              Visit Us
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>123 Green Valley Road</li>
              <li>Organic District, CA 90210</li>
              <li>hello@pureharvest.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4 text-primary">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Pure Harvest Farm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
