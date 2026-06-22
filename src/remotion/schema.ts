import { z } from "zod";

export const recapSchema = z.object({
  name: z.string(),
  year: z.number().int(),
  activity: z.enum(["driver", "it"]),
  moneyIn: z.number().min(0),
  moneyOut: z.number().min(0),
  taxes: z.number().min(0),
  prevIncome: z.number().min(0),
});

export type RecapData = z.infer<typeof recapSchema>;

export const DEFAULT_RECAP: RecapData = {
  name: "Andrei",
  year: 2025,
  activity: "driver",
  moneyIn: 340000,
  moneyOut: 45540,
  taxes: 28600,
  prevIncome: 250000,
};
