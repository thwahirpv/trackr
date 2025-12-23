import { Inter } from 'next/font/google'
import "./globals.css";
import Navbar from "./_components/Navbar";


export const metadata = {
  title: {
    template: '%s | Trackr',
    default: 'Trackr - Your Ultimate Job Application Tracker',
  },
  description: "Trackr is the comprehensive job application tracking tool designed to streamline your journey to being hired. Organize applications, track interview rates, and hit your career goals efficiently.",
  keywords: ["Trackr", "Job Application Tracker", "Application Tracker", "Job Search Organizer", "Career Management", "Resume Tracker", "Hiring Tool"],
  icons: {
    icon: '/logo.png', // Using the public logo as the favicon
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Trackr - Simplify Your Job Hunt',
    description: 'Manage your job applications, set goals, and get hired faster with Trackr.',
    siteName: 'Trackr',
    images: [
      {
        url: '/logo.png', // Fallback to logo or use dashboard.png if preferred for social sharing
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
