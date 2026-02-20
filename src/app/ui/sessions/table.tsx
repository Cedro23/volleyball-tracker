import { Session } from "@/app/lib/definitions";
import { sessions } from "@/app/lib/placeholder-data";
import { formatDateToLocal } from "@/app/lib/utils";
import { ViewSession, UpdateSession, DeleteSession } from "@/app/ui/sessions/buttons";

export default async function Table() {
  //   const latestSessions = await fetchLatestSessions();
  // todo: link group id to group name

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {sessions?.map((session: Session) => (
              <div
                key={session.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{formatDateToLocal(session.date.toDateString())}</p>
                    <p className="text-xl font-medium">Misa</p>
                    <p className="text-xl font-medium">{session.overallPerformance}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <ViewSession id={session.id} />
                    <UpdateSession id={session.id} />
                    <DeleteSession id={session.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-5 font-medium sm:pl-6"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Group
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Energy Level
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Serve Quality
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  First Touch
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Setting Quality
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Game Flow
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Attacking Quality
                </th>
                <th
                  scope="col"
                  className="px-3 py-5 font-medium"
                >
                  Overall Performance
                </th>
                <th
                  scope="col"
                  className="relative py-3 pl-6 pr-3"
                >
                  <span className="sr-only">View</span>
                  <span className="sr-only">Edit</span>
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sessions?.map((session: Session) => (
                <tr
                  key={session.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(session.date.toDateString())}</td>
                  <td className="whitespace-nowrap px-3 py-3">Misa</td>
                  <td className="whitespace-nowrap px-3 py-3">{session.energyLevel}</td>
                  <td className="whitespace-nowrap px-3 py-3">{session.serveQuality}</td>
                  <td className="whitespace-nowrap px-3 py-3">{session.firstTouch}</td>
                  <td className="whitespace-nowrap px-3 py-3">{session.settingQuality}</td>
                  <td className="whitespace-nowrap px-3 py-3">{session.gameFlow}</td>
                  <td className="whitespace-nowrap px-3 py-3">{session.attackingQuality}</td>
                  <td className="whitespace-nowrap px-3 py-3">{session.overallPerformance}</td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewSession id={session.id} />
                      <UpdateSession id={session.id} />
                      <DeleteSession id={session.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
