import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Gothic_A1 } from "next/font/google";
import "./globals.css";

// const maplestory = localFont({
//       src: [
//             {
//                   path: "../../public/fonts/MaplestoryLight.ttf",
//                   weight: "300",
//             },
//             {
//                   path: "../../public/fonts/MaplestoryBold.ttf",
//                   weight: "700",
//             },
//       ],
//       variable: "--font-maplestory",
// });

const gothicA1 = Gothic_A1({
      weight: ["400", "500", "700", "900"],
      subsets: ["latin"],
      variable: "--font-main",
});

export const metadata: Metadata = {
      title: "Ginkgo Story",
      description: "메이플스토리 짭",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
      return (
            <html lang="ko" className={gothicA1.variable}>
                  <body>{children}</body>
            </html>
      );
}