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
} from "~/components/ui/alert-dialog";
import { useGetSubscribers } from "~/requests/useGetSubscribers";
import { useDeleteSubscriber } from "~/requests/useDeleteSubscriber";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { useCreateSubscriber } from "~/requests/useCreateSubscriber";
import type { Subscriber } from "~/types/Subscriber.interface";
import { useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { AddSubscriberFormDialog } from "~/components/AddSubscriberFormDialog";

export default function HomePage() {
  const getSubscribersQuery = useGetSubscribers();
  const deleteSubscriberMutation = useDeleteSubscriber();
  const createSubscriberMutation = useCreateSubscriber();

  const { toast } = useToast();

  const [isAddSubscriberDialogOpen, setIsAddSubscriberDialogOpen] =
    useState(false);
  const [isDeleteSubscriberDialogOpen, setIsDeleteSubscriberDialogOpen] =
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
      <div className="flex flex-col items-center justify-center gap-6">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
      </div>
    );
  } else if (getSubscribersQuery.isError) {
    content = (
      <>
        <h2 className="mb-2 text-center text-xl font-semibold text-white">
          Error loading subscribers
        </h2>

        <p className="text-center text-base text-white/50">
          Please try refreshing the page
        </p>
      </>
    );
  } else if (getSubscribersQuery.data) {
    const list = getSubscribersQuery.data.data.map((subscriber) => (
      <TableRow key={subscriber.email}>
        <TableCell className="font-medium">{subscriber.email}</TableCell>
        <TableCell>{subscriber.name}</TableCell>
        <TableCell className="text-right">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setIsDeleteSubscriberDialogOpen(true);
            }}
          >
            <TrashIcon size={18} />
          </Button>

          <AlertDialog
            open={isDeleteSubscriberDialogOpen}
            onOpenChange={setIsDeleteSubscriberDialogOpen}
          >
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
      <>
        <div className="mb-2 flex flex-row justify-between">
          <h2 className="text-xl font-semibold text-white">Subscribers</h2>

          <Button
            onClick={() => {
              setIsAddSubscriberDialogOpen(true);
            }}
          >
            <PlusIcon /> Add subscriber
          </Button>
        </div>

        <AddSubscriberFormDialog
          open={isAddSubscriberDialogOpen}
          onOpenChange={setIsAddSubscriberDialogOpen}
          onSubmit={handleAddSubscriber}
        />

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
      </>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto max-w-3xl px-4 py-16">
        <h1 className="mb-16 text-center text-3xl font-bold text-white">
          Campaign List Manager
        </h1>

        {content}
      </div>
    </main>
  );
}
