import { z } from "zod";

// TODO ideally would like to combine this with dto, but still use the Subscriber interface
export const createSubscriberSchema = z.object({
  data: z.object({
    email: z.string().email(),
    name: z.string(),
  }),
});
