import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/utils/cart_context";
import { UserProvider } from "@/utils/user_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plannt",
  description: "A plant trading platform for plant enthusiasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <UserProvider>
        <CartProvider>
          <body className={inter.className}>{children}</body>
        </CartProvider>
      </UserProvider>
        
    </html>
  );
}
