"use client";

import { TrashIcon } from "lucide-react";
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
import { useGetSubscribers } from "~/requests/useGetSubscribers";
import { useDeleteSubscriber } from "~/requests/useDeleteSubscriber";

export default function HomePage() {
  const getSubscribersQuery = useGetSubscribers();
  const deleteSubscriberMutation = useDeleteSubscriber();

  const handleDeleteSubscriber = (email: string) => {
    // TODO display toast on success / error
    // TODO maybe invalidate subscribers query or optimistically update it
    deleteSubscriberMutation.mutate(email);
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
