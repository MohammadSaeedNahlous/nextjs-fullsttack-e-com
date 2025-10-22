import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const currency = z
  .string()
  // refine used to add custom validation
  // the callback function does the validation of the decimal places
  // if the value matches the regex pattern, it's valid
  // otherwise, it returns an error message
  // ensure the value is a valid number with at most 2 decimal places
  // exmaple valid values: "10", "10.5", "10.50"
  // example invalid values: "10.555", "10.1234", "10.1a"
  .refine(
    (val) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(val))),
    {
      message: 'Price must have at most 2 decimal places',
    }
  );

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters long'),
  slug: z.string().min(3, 'Slug must be at least 3 characters long'),
  category: z.string().min(3, 'Category must be at least 3 characters long'),
  brand: z.string().min(2, 'Brand must be at least 2 characters long'),
  describtion: z
    .string()
    .min(10, 'Description must be at least 10 characters long'),
  // Coerce: to number in case of string input
  stock: z.coerce.number(),
  images: z.array(z.string().min(1, 'At least one image is required')),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
