import { z } from "zod";

export const defaultValues = {
  amount: "",
  rrn: "",
  transactionDate: "",
  paymentImage: null,
  idempotencyKey: "",
};

export const fundRequestSchema = z.object({
  amount: z.coerce.number().positive("Amount is required"),

  rrn: z.string().trim().min(6, "RRN is required"),

  transactionDate: z.string().min(1, "Transaction Date is required"),
  idempotencyKey: z.uuid(),

  paymentImage: z.instanceof(File, {
    message: "Payment Screenshot is required",
  }),
});
