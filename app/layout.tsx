import { Nunito } from "next/font/google";

import Navbar from "@/app/components/navbar/Navbar";
import LoginModal from "@/app/components/modals/LoginModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import SearchModal from "@/app/components/modals/SearchModal";
import RentModal from "@/app/components/modals/RentModal";
import CancelModal from "./components/modals/CancelModal";

import ToasterProvider from "@/app/providers/ToasterProvider";

import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
import Footer from "./components/Footer";

export const metadata = {
  title: "Paradise Resort",
  description:
    "Paradise Resort adalah destinasi liburan mewah yang menawarkan pengalaman tak terlupakan bagi para tamu. Terletak di tepi pantai yang indah, hotel ini menyuguhkan kemewahan, kenyamanan, dan pemandangan alam yang menakjubkan.",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col`}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <CancelModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pt-20">{children}</div>
        <ClientOnly>
          <Footer />
        </ClientOnly>
      </body>
    </html>
  );
}
