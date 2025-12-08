import { Inter } from 'next/font/google'
import "./globals.css";
import Navbar from "./_components/Navbar";


export const metadata = {
  title: "Trackr",
  description: "Your journey to hired.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <div className="min-h-screen bg-background">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
