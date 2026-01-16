// app/providers.tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";


import { Toaster } from "./components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </SessionProvider>

    </QueryClientProvider>
  );
}
