import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import { version } from "../../next.config";

export const metadata: Metadata = {
  title: {
    template: "%s | VolleyTrack v" + `${version}`,
    default: "VolleyTrack v" + `${version}`,
  },
  description:
    "VolleyTrack is a web application designed to help volleyball players and coaches track their performance, analyze game statistics, and improve their skills. With an intuitive interface and powerful features, VolleyTrack makes it easy to monitor progress and achieve your goals on the court.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
