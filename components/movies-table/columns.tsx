import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Movie } from "@/lib/types";
import { MovieForm } from "../dialogs/MovieForm";
import { DeleteMovie } from "../dialogs/DeleteMovie";

export const columns = (
  reloadData: () => Promise<void>
): ColumnDef<Movie>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
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
    cell: ({ row }) => <div>{row.getValue("year")}</div>,
  },
  {
    accessorKey: "director",
    header: "Director",
    cell: ({ row }) => <div>{row.getValue("director")}</div>,
  },
  {
    accessorKey: "poster",
    header: () => <div className="text-center">Poster</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <img src={row.getValue("poster")} alt="movie image" width={"10%"} />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className="text-right">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-2">
          <MovieForm
            mode="update"
            movie={row.original}
            reloadData={reloadData}
          />
          <DeleteMovie id={row.getValue("id")} reloadData={reloadData} />
        </div>
      );
    },
  },
];
