"use client";
import { ShoppingBasket, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useCart } from "@/context/CartContext";
import { CartSidebar } from "./CartSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const logo = "/images/vadi.png";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { items } = useCart();
  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);



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
                <span className={`
                  text-sm font-medium cursor-pointer transition-colors duration-200
                  ${pathname === link.href

                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground/80 hover:text-primary"}
                `}>
                  {link.label}
                </span>
              </Link>
            ))}

            <Button
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
            </Button>
            {/* User Menu */}
            {session && (
              <div ref={userMenuRef} className="relative">

                <button
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition"
                >
                  <User className="w-5 h-5 text-primary" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg border border-border/50 overflow-hidden z-50">
                    <div className="px-4 py-3 text-sm text-muted-foreground">
                      {session.user?.email}
                    </div>

                    <button
                      onClick={() => signOut()}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                    <Link
                      href="/orders"
                      className="block px-4 py-3 text-sm hover:bg-muted"
                    >
                      My Orders
                    </Link>

                  </div>
                )}
              </div>
            )}

          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
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
            {session && (
              <>
                <button
                  onClick={() => signOut()}
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <User className="w-5 h-5 text-primary" />
                </button>
                <Link
                  href="/orders"
                  className="block px-4 py-3 text-sm hover:bg-muted"
                >
                  My Orders
                </Link>

              </>


            )}


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
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <span className={`
                        text-xl font-display font-medium block text-center py-2 cursor-pointer
                        ${pathname === link.href
                          ? "text-primary" : "text-foreground"}
                      `}>
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <CartSidebar open={isCartOpen} onOpenChange={setIsCartOpen} />
    </nav>
  );
}
