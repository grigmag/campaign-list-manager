import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DeleteSubscriberRequestDto } from "~/app/api/subscribers/_dto/deleteSubscriber.dto";
import { getSubscribersQueryKey } from "./useGetSubscribers";

export const useDeleteSubscriber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (email: string) => {
      const body: DeleteSubscriberRequestDto = {
        data: {
          email,
        },
      };

      const response = await fetch(`/api/subscribers`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to delete subscriber");
      }

      return;
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: getSubscribersQueryKey,
      });
    },
  });
};
