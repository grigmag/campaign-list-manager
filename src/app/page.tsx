"use client";

import { PlusIcon } from "lucide-react";
import { useGetSubscribers } from "~/requests/useGetSubscribers";
import { useDeleteSubscriber } from "~/requests/useDeleteSubscriber";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { useCreateSubscriber } from "~/requests/useCreateSubscriber";
import type { Subscriber } from "~/types/Subscriber.interface";
import { useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import { AddSubscriberFormDialog } from "~/components/AddSubscriberFormDialog";
import { SubscribersTable } from "~/components/SubscribersTable";
import { DeleteSusbscriberConfirmationDialog } from "~/components/DeleteSusbscriberConfirmationDialog";

export default function HomePage() {
  const getSubscribersQuery = useGetSubscribers();
  const deleteSubscriberMutation = useDeleteSubscriber();
  const createSubscriberMutation = useCreateSubscriber();

  const { toast } = useToast();

  const [isAddSubscriberDialogOpen, setIsAddSubscriberDialogOpen] =
    useState(false);
  const [isDeleteSubscriberDialogOpen, setIsDeleteSubscriberDialogOpen] =
    useState(false);
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);

  const handleDeleteSubscriber = () => {
    if (!emailToDelete) {
      return;
    }

    // TODO maybe invalidate subscribers query or optimistically update it
    deleteSubscriberMutation.mutate(emailToDelete, {
      onSuccess: () => {
        toast({
          title: "The subscriber has been deleted.",
          description:
            "The change might need a few moments to be displayed. Try refreshing the page if it doesn't.",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          description: "Something went wrong! Please try again.",
        });
      },
    });

    setEmailToDelete(null);
  };

  const handleAddSubscriber = (values: Subscriber) => {
    setIsAddSubscriberDialogOpen(false);

    createSubscriberMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: "Subscriber added successfully",
          description:
            "The change might need a few moments to be displayed. Try refreshing the page if it doesn't.",
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

        <DeleteSusbscriberConfirmationDialog
          open={isDeleteSubscriberDialogOpen}
          onOpenChange={(open) => {
            setIsDeleteSubscriberDialogOpen(open);
            if (!open) {
              setEmailToDelete(null);
            }
          }}
          onClickDeleteSubscriber={handleDeleteSubscriber}
        />

        <SubscribersTable
          subscribers={getSubscribersQuery.data.data}
          onClickDeleteSubscriber={(email) => {
            setEmailToDelete(email);
            setIsDeleteSubscriberDialogOpen(true);
          }}
        />
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
