"use client";
import { ShoppingBasket, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
// import { useCart } from "@/context/CartContext";
// import { CartSidebar } from "./CartSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
const logo = "/images/vadi.png";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  //   const { items } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer group">
              <img
                src={logo}
                alt="Farm Logo"
                className="h-12 w-auto transform transition-transform group-hover:scale-105"
              />
              <span className="font-display text-xl font-bold text-primary hidden sm:block">
                Pure Harvest
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`
                  text-sm font-medium cursor-pointer transition-colors duration-200
                  ${
                    pathname === link.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground/80 hover:text-primary"
                  }
                `}
                >
                  {link.label}
                </span>
              </Link>
            ))}

            {/* <Button
              variant="outline"
              className="rounded-full border-primary/20 hover:border-primary text-primary hover:bg-primary/5 gap-2 relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBasket className="w-4 h-4" />
              <span className="hidden lg:inline">Cart ({items.length})</span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Button> */}
          </div>

          {/* Mobile Menu Toggle */}
          {/* <div className="md:hidden flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBasket className="w-5 h-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background border-none w-[300px]">
                <div className="flex flex-col gap-6 mt-10">
                  <div className="flex items-center justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-16 w-auto" />
                  </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span
                        className={`
                        text-xl font-display font-medium block text-center py-2 cursor-pointer
                        ${
                          location === link.href
                            ? "text-primary"
                            : "text-foreground"
                        }
                      `}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div> */}
        </div>
      </div>

      {/* <CartSidebar open={isCartOpen} onOpenChange={setIsCartOpen} /> */}
    </nav>
  );
}
