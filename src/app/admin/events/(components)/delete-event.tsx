"use client";

import { FC, useState } from "react";
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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import Spinner from "@/components/ui/spinner";
import { deleteEvent } from "@/actions";

const DeleteEvent: FC<{eventId: string}> = ({ eventId }) => {

  const [ isDeleting, setIsDeleting ] = useState(false);

  const handleDeleteEvent = async (id: string) => {

    setIsDeleting(true);

    const response = await deleteEvent(id);

    setIsDeleting(false);

    if (!response.ok) {
      toast.error(response.message, {
        duration: 3000,
        position: "top-right",
        className: "bg-red-500 text-white",
      });
    }

    if (response.ok) {
      toast.success(response.message, {
        duration: 3000,
        position: "top-right",
        className: "bg-green-500 text-white",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="danger">
          { isDeleting ? <Spinner /> : <Trash2 /> }
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-3 text-gray-300">
            <p>This action cannot be undone.</p>
            <p className="text-pretty">This will permanently delete your event and data from our servers will deleted forever and cannot be recovered !</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-blue-600 text-blue-50 hover:bg-blue-800"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteEvent(eventId)}
            className="bg-red-600 text-red-50 hover:bg-red-800"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEvent;