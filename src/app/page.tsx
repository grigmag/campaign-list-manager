"use client";

import { PlusIcon, TrashIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
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
} from "~/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useGetSubscribers } from "~/requests/useGetSubscribers";
import { useDeleteSubscriber } from "~/requests/useDeleteSubscriber";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { AddSubscriberForm } from "~/components/AddSubscriberForm";
import { useCreateSubscriber } from "~/requests/useCreateSubscriber";
import type { Subscriber } from "~/types/Subscriber.interface";
import { useState } from "react";

export default function HomePage() {
  const getSubscribersQuery = useGetSubscribers();
  const deleteSubscriberMutation = useDeleteSubscriber();
  const createSubscriberMutation = useCreateSubscriber();

  const { toast } = useToast();

  const [isAddSubscriberDialogOpen, setIsAddSubscriberDialogOpen] =
    useState(false);

  const handleDeleteSubscriber = (email: string) => {
    // TODO maybe invalidate subscribers query or optimistically update it
    deleteSubscriberMutation.mutate(email, {
      onSuccess: () => {
        toast({
          description: "The subscriber has been deleted.",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          description: "Something went wrong! Please try again.",
        });
      },
    });
  };

  const handleAddSubscriber = (values: Subscriber) => {
    setIsAddSubscriberDialogOpen(false);

    createSubscriberMutation.mutate(values, {
      onSuccess: () => {
        toast({
          description: "Subscriber added successfully",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          description: "Something went wrong! Please try again.",
        });
      },
    });
  };

  let content: JSX.Element | undefined;

  if (getSubscribersQuery.isLoading) {
    content = (
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Loading subscribers...
        </h2>
      </div>
    );
  } else if (getSubscribersQuery.isError) {
    content = (
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Error loading subscribers
        </h2>
        <p className="text-lg text-white/50">
          {getSubscribersQuery.error.message}
        </p>
      </div>
    );
  } else if (getSubscribersQuery.data) {
    const list = getSubscribersQuery.data.data.map((subscriber) => (
      <TableRow key={subscriber.email}>
        <TableCell className="font-medium">{subscriber.email}</TableCell>
        <TableCell>{subscriber.name}</TableCell>
        <TableCell className="text-right">
          <AlertDialog>
            <AlertDialogTrigger>
              <TrashIcon size={18} />
            </AlertDialogTrigger>

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
                <AlertDialogCancel className="text-white">
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => {
                    handleDeleteSubscriber(subscriber.email);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TableCell>
      </TableRow>
    ));

    content = (
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Subscribers
        </h2>

        <Button
          onClick={() => {
            setIsAddSubscriberDialogOpen(true);
          }}
        >
          <PlusIcon /> Add subscriber
        </Button>

        <Dialog
          open={isAddSubscriberDialogOpen}
          onOpenChange={setIsAddSubscriberDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-6 text-white">
                Add subscriber
              </DialogTitle>

              <DialogDescription className="!mb-4 text-white">
                Fill in the form below to add a new subscriber to the list.
              </DialogDescription>

              <AddSubscriberForm onSubmit={handleAddSubscriber} />
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>{list}</TableBody>
        </Table>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Campaign List Manager
        </h1>

        {content}
      </div>
    </main>
  );
}
