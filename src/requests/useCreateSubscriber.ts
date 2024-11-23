import { useMutation } from "@tanstack/react-query";
import type { CreateSubscriberRequestDto } from "~/app/api/subscribers/_dto/createSubscriber.dto";
import type { Subscriber } from "~/types/Subscriber.interface";

export const useCreateSubscriber = () =>
  useMutation({
    mutationFn: async (subscriber: Subscriber) => {
      const body: CreateSubscriberRequestDto = {
        data: subscriber,
      };

      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to create subscriber");
      }

      return;
    },
  });
