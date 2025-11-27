import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Daily Planner - Plan, Reflect, Grow",
  description: "A productivity app for daily planning, reflection, and long-term progress tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AppProvider>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
