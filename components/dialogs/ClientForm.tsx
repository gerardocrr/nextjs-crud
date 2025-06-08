import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PropsClient } from "@/lib/types";
import { Pencil } from "lucide-react";
import { useState } from "react";

export function ClientForm({ mode, client }: PropsClient) {
  const [data, setData] = useState({
    id: client?.id || "",
    name: client?.name || "",
    status: client?.status || "",
    email: client?.email || "",
    amount: client?.amount || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (mode === "new") {
      await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          status: data.status,
          email: data.email,
          amount: data.amount,
        }),
      });
    } else {
      await fetch("/api/clients", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          status: data.status,
          email: data.email,
          amount: data.amount,
          id: data.id,
        }),
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {mode === "new" ? (
          <Button>New client</Button>
        ) : (
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {mode === "new" ? (
            <DialogHeader className="mb-5">
              <DialogTitle>Add a new client</DialogTitle>
              <DialogDescription>
                Fill in the requested data, click on save when you are done.
              </DialogDescription>
            </DialogHeader>
          ) : (
            <DialogHeader className="mb-5">
              <DialogTitle>Update client</DialogTitle>
              <DialogDescription>
                Modify the data you need, click on update when you are done.
              </DialogDescription>
            </DialogHeader>
          )}
          <div className="grid gap-4 mb-5">
            <div className="grid gap-3">
              <label htmlFor="name">Name:</label>
              <Input
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="status">Status:</label>
              <Select
                value={data.status}
                onValueChange={(value) => {
                  setData((prevData) => ({
                    ...prevData,
                    status: value,
                  }));
                }}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <label htmlFor="email">Email:</label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="email@company.com"
                onChange={handleChange}
                value={data.email}
                required
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="amount">Amount:</label>
              <Input
                type="number"
                id="amount"
                step={0.01}
                name="amount"
                placeholder="000.00"
                min={0}
                onChange={handleChange}
                value={data.amount}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{mode === "new" ? "Save" : "Update"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
