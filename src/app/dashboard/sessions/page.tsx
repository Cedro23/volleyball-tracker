import Table from "@/app/ui/sessions/table";
import { inter } from "@/app/ui/fonts";
import { Metadata } from "next";
import { CreateSession } from "@/app/ui/sessions/buttons";

export const metadata: Metadata = {
  title: "Sessions",
};

export default async function Page() {
  return (
    <main>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <h1 className={`${inter.className} mb-4 text-xl md:text-2xl`}>Sessions</h1>
        <CreateSession />
      </div>
      <div>
        {/* <Suspense fallback={<LatestInvoicesSkeleton />}> */}
        <Table />
        {/* </Suspense> */}
      </div>
    </main>
  );
}
