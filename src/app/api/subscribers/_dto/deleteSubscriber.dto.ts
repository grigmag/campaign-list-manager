import type { Subscriber } from "~/types/Subscriber.interface";

export interface DeleteSubscriberRequestDto {
  data: Pick<Subscriber, "email">;
}
