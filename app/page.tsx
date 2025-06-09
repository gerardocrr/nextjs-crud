"use client";

import { DataTable } from "@/components/clients-table/data-table";
import { columns } from "@/components/clients-table/columns";
import { useEffect, useState } from "react";

export default function Home() {
  const [dataClients, setDataClients] = useState([]);
  const fetchData = async () => {
    const res = await fetch("/api/clients");
    const data = await res.json();
    setDataClients(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataTable
      columns={columns(fetchData)}
      data={dataClients}
      reloadData={fetchData}
    />
  );
}
