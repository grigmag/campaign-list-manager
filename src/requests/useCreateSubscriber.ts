import { useMutation } from "@tanstack/react-query";
import type { CreateSubscriberRequestDto } from "~/app/api/subscribers/_dto/createSubscriber.dto";

export const useCreateSubscriber = () =>
  useMutation({
    mutationFn: async (data: CreateSubscriberRequestDto) => {
      const response = await fetch("/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create subscriber");
      }

      return;
    },
  });
