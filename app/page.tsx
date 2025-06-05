"use client";

import { DataTable } from "@/components/clients-table/data-table";
import { columns } from "@/components/clients-table/columns";
import { useEffect, useState } from "react";

export default function Home() {
  const [dataClients, setDataClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/clients");
      const data = await res.json();
      setDataClients(data);
    };
    fetchData();
  }, []);

  return <DataTable columns={columns} data={dataClients} />;
}
