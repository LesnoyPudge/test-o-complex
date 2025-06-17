import * as v from 'valibot';



export const PhoneNumberSchema = v.pipe(
    v.string(),
    v.nonEmpty('Введите номер'),
    v.digits('Значение не число'),
    v.check((v) => {
        return String(v).length === 10;
    }, 'Номер введён не полностью'),
);

export type PhoneNumberStringSchema = v.InferInput<typeof PhoneNumberSchema>;

export type PhoneNumberSchema = v.InferOutput<typeof PhoneNumberSchema>;

export const CartItemSchema = v.object({
    id: v.number(),
    quantity: v.number(),
});

export type CartItemSchema = v.InferOutput<typeof PhoneNumberSchema>;

export const CartSchema = v.array(CartItemSchema);

export type CartSchema = v.InferOutput<typeof CartSchema>;

export const OrderRequestSchema = v.object({
    phone: PhoneNumberSchema,
    cart: v.pipe(
        CartSchema,
        v.minLength(1),
    ),
});

export const OrderRequestFormSchema = v.pick(OrderRequestSchema, ['phone']);

export type OrderRequestFormSchema = v.InferOutput<
    typeof OrderRequestFormSchema
>;

export type OrderRequestSchema = v.InferInput<typeof OrderRequestSchema>;

export const OrderFailedResponseSchema = v.object({
    success: v.pipe(v.number(), v.check((v) => v === 0)),
    error: v.string(),
});

export type OrderFailedResponseSchema = v.InferOutput<
    typeof OrderFailedResponseSchema
>;

export const OrderSucceedResponseSchema = v.object({
    success: v.pipe(v.number(), v.check((v) => v === 1)),
});

export type OrderSucceedResponseSchema = v.InferOutput<
    typeof OrderSucceedResponseSchema
>;

export const ReviewSchema = v.object({
    id: v.number(),
    text: v.string(),
});

export type ReviewSchema = v.InferOutput<typeof ReviewSchema>;

export const ReviewsSchema = v.array(ReviewSchema);

export type ReviewsSchema = v.InferOutput<typeof ReviewsSchema>;

export const ProductSchema = v.object({
    id: v.number(),
    image_url: v.pipe(v.string(), v.url()),
    title: v.string(),
    description: v.string(),
    price: v.number(),
});

export type ProductSchema = v.InferOutput<typeof ProductSchema>;

export const ProductsResponseSchema = v.object({
    page: v.number(),
    amount: v.number(),
    total: v.number(),
    items: v.array(ProductSchema),
});

export type ProductsResponseSchema = v.InferOutput<typeof ProductsResponseSchema>;

const ProductsRequestSchema = v.object({
    page: v.number(),
    pageSize: v.number(),
});

export type ProductsRequestSchema = v.InferOutput<typeof ProductsRequestSchema>;