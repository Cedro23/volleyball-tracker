import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Session",
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>View Session</h1>
    </main>
  );
}
