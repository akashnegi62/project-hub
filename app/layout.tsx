import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Hub",
  description: "Project Management System",
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
