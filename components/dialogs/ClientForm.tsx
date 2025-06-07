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

export function ClientForm({ mode, client }: PropsClient) {
  return (
    <Dialog>
      <form>
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
          {mode === "new" ? (
            <DialogHeader>
              <DialogTitle>Add a new client</DialogTitle>
              <DialogDescription>
                Fill in the requested data, click on save when you are done.
              </DialogDescription>
            </DialogHeader>
          ) : (
            <DialogHeader>
              <DialogTitle>Update client</DialogTitle>
              <DialogDescription>
                Modify the data you need, click on update when you are done.
              </DialogDescription>
            </DialogHeader>
          )}
          <div className="grid gap-4 w-full">
            <div className="grid gap-3">
              <label htmlFor="name">Name</label>
              <Input id="name" name="name" defaultValue={client?.name} />
            </div>
            <div className="grid gap-3">
              <label htmlFor="status">Status</label>
              <Select
                defaultValue={client?.status}
                // onValueChange={(value) => {
                //   setFormData((prevData) => ({
                //     ...prevData,
                //     status: value,
                //   }));
                // }}
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
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="email@company.com"
                // onChange={handleChange}
                defaultValue={client?.email}
                required
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="amount">Amount</label>
              <Input
                type="number"
                id="amount"
                name="amount"
                placeholder="000.00"
                min={0}
                // onChange={handleChange}
                defaultValue={client?.amount}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {mode === "new" ? (
              <Button type="submit">Save</Button>
            ) : (
              <Button type="submit">Update</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
