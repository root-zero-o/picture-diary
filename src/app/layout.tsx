import "../styles/components.css";
import "../styles/globals.css";

import Header from "@/components/Header";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "그림일기",
  description: "그림일기를 그려보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased`}>
        <ReactQueryProvider>
          <div className="flex h-screen justify-center font-pretendard">
            <main
              className="w-full
       max-w-[800px] h-full flex flex-col items-center p-10 pb-16 gap-4"
            >
              <Header />
              {children}
            </main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
