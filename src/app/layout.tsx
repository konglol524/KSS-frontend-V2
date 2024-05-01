import "./globals.css";
import type { Metadata } from "next";
import TopMenu from "../components/TopMenu";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import Faq from "@/components/Faq";
export const metadata: Metadata = {
  title: "Car Rental by DekBanJarnKim",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextAuthSession = await getServerSession(authOptions);

  return (
    <html lang="en" className="">
      <body className="text-center">
        <NextAuthProvider session={nextAuthSession}>
          <TopMenu />
          <div className="h-[65px]"></div>
          {children}
          <Faq />
        </NextAuthProvider>
      </body>
    </html>
  );
}
