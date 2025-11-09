import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Activity } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DCACNet - Skin Lesion Classification",
  description: "AI-powered skin lesion classification using deep learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {/* Navigation */}
          <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="flex items-center space-x-2">
                  <Activity className="h-8 w-8 text-blue-600" />
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    DCACNet
                  </span>
                </Link>

                <div className="hidden md:flex space-x-8">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition"
                  >
                    Home
                  </Link>
                  <Link
                    href="/predict"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition"
                  >
                    Try Demo
                  </Link>
                  <Link
                    href="/performance"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition"
                  >
                    Performance
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition"
                  >
                    About
                  </Link>
                </div>

                <a
                  href="https://github.com/Hasnain-Fatmi/DCACNet-CD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:block px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main>{children}</main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600 text-sm">
                <p className="font-semibold text-red-600 mb-2">
                  MEDICAL DISCLAIMER
                </p>
                <p className="mb-4">
                  This tool is for educational and research purposes only. It
                  is NOT a substitute for professional medical advice, diagnosis,
                  or treatment. Always seek the advice of a qualified healthcare
                  provider.
                </p>
                <p className="text-gray-500">
                  © 2024 DCACNet. Built with Next.js and PyTorch.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
