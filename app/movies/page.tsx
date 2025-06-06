"use client";

import { DataTable } from "@/components/movies-table/data-table";
import { columns } from "@/components/movies-table/columns";
import { useEffect, useState } from "react";

export default function Movies() {
  const [dataMovies, setDataMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setDataMovies(data);
    };
    fetchData();
  }, []);

  return <DataTable columns={columns} data={dataMovies} />;
}
