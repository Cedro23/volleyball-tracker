import { inter } from "@/app/ui/fonts";
// import { Suspense } from "react";
// import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from "@/app/ui/skeletons";
// import CardWrapper from "@/app/ui/dashboard/cards";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Page() {
  return (
    <main>
      <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
    </main>
  );
}
