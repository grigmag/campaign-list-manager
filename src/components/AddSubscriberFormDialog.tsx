"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { AddSubscriberForm } from "./AddSubscriberForm";
import type { ComponentProps } from "react";

export const AddSubscriberFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: ComponentProps<typeof Dialog>["open"];
  onOpenChange: ComponentProps<typeof Dialog>["onOpenChange"];
  onSubmit: ComponentProps<typeof AddSubscriberForm>["onSubmit"];
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-6 text-white">Add subscriber</DialogTitle>

          <DialogDescription className="!mb-4 text-white">
            Fill in the form below to add a new subscriber to the list.
          </DialogDescription>

          <AddSubscriberForm onSubmit={onSubmit} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
