import "./globals.css";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Apple",
  description: "Apple web UI clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-[#f5f5f7] text-[#1d1d1f] dark:bg-black dark:text-[#f5f5f7]">
        <div id="page">
          <Header />
          <main id="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
