import { useQuery } from "@tanstack/react-query";
import type { GetSubscribersResponseDto } from "~/app/api/subscribers/_dto/getSubscribers.dto";

export const getSubscribersQueryKey = ["subscribers"];

export const useGetSubscribers = () =>
  useQuery({
    queryKey: getSubscribersQueryKey,
    queryFn: async () => {
      const response = await fetch("/api/subscribers");

      if (!response.ok) {
        throw new Error("Failed to fetch subscribers");
      }

      const data = (await response.json()) as GetSubscribersResponseDto;

      return data;
    },
  });
