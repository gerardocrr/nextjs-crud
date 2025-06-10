import { Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface DialogProps {
  id: string;
  reloadData: () => Promise<void>;
}

export function DeleteMovie({ id, reloadData }: DialogProps) {
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleClicDelete = async () => {
    setIsLoadingButton(true);
    await fetch("/api/movies", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    setIsLoadingButton(false);
    reloadData();
    toast.success("Client deleted successfully.");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="hover:bg-[#FF666618]" variant="outline" size="icon">
          <Trash2 className="text-red-700" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {isLoadingButton ? (
            <AlertDialogAction disabled>
              <Loader2 className="animate-spin" />
              Eliminar
            </AlertDialogAction>
          ) : (
            <AlertDialogAction onClick={handleClicDelete}>
              Eliminar
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
