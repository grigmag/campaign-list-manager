import type { ComponentProps } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export const DeleteSusbscriberConfirmationDialog = ({
  open,
  onOpenChange,
  onClickDeleteSubscriber,
}: {
  open: ComponentProps<typeof AlertDialog>["open"];
  onOpenChange: ComponentProps<typeof AlertDialog>["onOpenChange"];
  onClickDeleteSubscriber: VoidFunction;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Delete subscriber?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-white">Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={onClickDeleteSubscriber}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
