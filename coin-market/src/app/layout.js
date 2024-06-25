import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const poppins = Poppins({ weight: ['400', '700'], subsets: ["latin"] });

export const metadata = {
  title: "MarketCoin",
  description: "Information about Coins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        {children}</body>
    </html>
  );
}
