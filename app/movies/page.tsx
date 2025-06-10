"use client";

import { DataTable } from "@/components/movies-table/data-table";
import { columns } from "@/components/movies-table/columns";
import { useEffect, useState } from "react";

export default function Movies() {
  const [dataMovies, setDataMovies] = useState([]);
  const fetchData = async () => {
    const res = await fetch("/api/movies");
    const data = await res.json();
    setDataMovies(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataTable
      columns={columns(fetchData)}
      data={dataMovies}
      reloadData={fetchData}
    />
  );
}
