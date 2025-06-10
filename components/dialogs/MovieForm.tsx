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
import { Button } from "@/components/ui/button";
import { PropsMovie } from "@/lib/types";
import { Pencil, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function MovieForm({ mode, movie, reloadData }: PropsMovie) {
  const [open, setOpen] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [data, setData] = useState({
    id: movie?.id || "",
    title: movie?.title || "",
    year: movie?.year || "",
    director: movie?.director || "",
    poster: movie?.poster || "",
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
    setIsLoadingButton(true);
    if (mode === "new") {
      await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          year: data.year,
          director: data.director,
          poster: data.poster,
        }),
      });
      setIsLoadingButton(false);
      reloadData();
      setOpen(false);
      toast.success("Client saved successfully.");
    } else {
      await fetch("/api/movies", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          year: data.year,
          director: data.director,
          poster: data.poster,
          id: data.id,
        }),
      });
      setIsLoadingButton(false);
      reloadData();
      setOpen(false);
      toast.success("Client updated successfully.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "new" ? (
          <Button>New movie</Button>
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
              <DialogTitle>Add a new movie</DialogTitle>
              <DialogDescription>
                Fill in the requested data, click on save when you are done.
              </DialogDescription>
            </DialogHeader>
          ) : (
            <DialogHeader className="mb-5">
              <DialogTitle>Update movie</DialogTitle>
              <DialogDescription>
                Modify the data you need, click on update when you are done.
              </DialogDescription>
            </DialogHeader>
          )}
          <div className="grid gap-4 mb-5">
            <div className="grid gap-3">
              <label htmlFor="name">Title:</label>
              <Input
                id="title"
                name="title"
                value={data.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="name">Year:</label>
              <Input
                type="number"
                min={0}
                id="year"
                name="year"
                value={data.year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="email">Director:</label>
              <Input
                id="director"
                name="director"
                onChange={handleChange}
                value={data.director}
                required
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="amount">Poster url:</label>
              <Input
                id="poster"
                name="poster"
                onChange={handleChange}
                value={data.poster}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            {isLoadingButton ? (
              <Button type="submit" disabled>
                <Loader2 className="animate-spin" />
                {mode === "new" ? "Saving" : "Updating"}
              </Button>
            ) : (
              <Button type="submit">
                {mode === "new" ? "Save" : "Update"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
