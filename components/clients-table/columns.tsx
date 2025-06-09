import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Client } from "@/lib/types";
import { ClientForm } from "../dialogs/ClientForm";
// import { DialogDelete } from "../DialogDelete";

export const columns = (
  reloadData: () => Promise<void>
): ColumnDef<Client>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as
        | "pending"
        | "processing"
        | "success"
        | "failed";
      const variant = {
        pending:
          "capitalize bg-gray-500 p-1 rounded-sm w-20 text-white text-center",
        processing:
          "capitalize bg-orange-500 p-1 rounded-sm w-20 text-white text-center",
        success:
          "capitalize bg-green-500 p-1 rounded-sm w-20 text-white text-center",
        failed:
          "capitalize bg-red-600 p-1 rounded-sm w-20 text-white text-center",
      }[status];
      return <div className={variant}>{status}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <svg
            className="w-5 h-5 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m8 15 4 4 4-4m0-6-4-4-4 4"
            />
          </svg>
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-right">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-2">
          <ClientForm
            mode="update"
            client={row.original}
            reloadData={reloadData}
          />
          {/* <DialogDelete table={"clients"} id={row.getValue("id")} /> */}
        </div>
      );
    },
  },
];
