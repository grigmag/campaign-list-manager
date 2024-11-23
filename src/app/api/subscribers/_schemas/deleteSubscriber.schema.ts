import { z } from "zod";

export const deleteSubscriberSchema = z.object({
  data: z.object({
    email: z.string().email(),
  }),
});
