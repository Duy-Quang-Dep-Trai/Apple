import "./globals.css";
import Header from "@/components/header/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="min-h-dvh bg-white text-[#1d1d1f] antialiased">
        <div id="page" className="min-h-dvh">
          <Header />
          <main id="main" role="main" className="relative">
            {children}
          </main>
          {/* footer sau */}
        </div>
      </body>
    </html>
  );
}
