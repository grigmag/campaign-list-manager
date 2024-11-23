import { useMutation } from "@tanstack/react-query";
import type { DeleteSubscriberRequestDto } from "~/app/api/subscribers/_dto/deleteSubscriber.dto";

export const useDeleteSubscriber = () => useMutation({
  mutationFn: async (data: DeleteSubscriberRequestDto) => {
    const response = await fetch(`/api/subscribers`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to delete subscriber");
    }

    return;
  },
})