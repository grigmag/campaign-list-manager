import type { Subscriber } from "~/types/Subscriber.interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import * as React from "react";
import { TrashIcon } from "lucide-react";

export const SubscribersTable = ({
  subscribers,
  onClickDeleteSubscriber,
}: {
  subscribers: Subscriber[];
  onClickDeleteSubscriber: (email: string) => void;
}) => {
  const rows = subscribers.map((subscriber) => (
    <TableRow key={subscriber.email}>
      <TableCell className="font-medium">{subscriber.email}</TableCell>
      <TableCell>{subscriber.name}</TableCell>
      <TableCell className="text-right">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            onClickDeleteSubscriber(subscriber.email);
          }}
        >
          <TrashIcon size={18} />
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>{rows}</TableBody>
    </Table>
  );
};
