import { HTTP_METHODS } from '@lesnoypudge/utils';
import * as v from 'valibot';
import {
    OrderFailedResponseSchema,
    OrderRequestSchema,
    OrderSucceedResponseSchema,
    ProductsRequestSchema,
    ProductsResponseSchema,
    ReviewsSchema,
} from '@/schemas';
import { headers } from './utils';
import { FETCH_PRODUCTS_SIZE } from '@/vars';



export const getReviews = async () => {
    const raw = await fetch('http://o-complex.com:1337/reviews', {
        headers,
        method: HTTP_METHODS.GET,
    });

    const json = await raw.json();

    const data = v.parse(ReviewsSchema, json);

    return data;
};

const getProducts = async ({
    page,
    pageSize,
}: ProductsRequestSchema) => {
    const params = new URLSearchParams({
        page: String(page),
        page_size: String(pageSize),
    });

    const url = new URL('http://o-complex.com:1337/products');

    url.search = params.toString();

    const raw = await fetch(url, {
        headers,
        method: HTTP_METHODS.GET,
    });

    const json = await raw.json();

    return v.parse(ProductsResponseSchema, json);
};

export const getFixedSizeProducts = async (page: number) => {
    return await getProducts({ page, pageSize: FETCH_PRODUCTS_SIZE });
};

const getProductById = async (id: number) => {
    const { items: [product] } = await getProducts({ page: id, pageSize: 1 });

    if (!product) throw new Error('товар не найден');

    return product;
};

export const getProductsByIds = async (ids: number[]) => {
    return await Promise.all(ids.map((id) => getProductById(id)));
};

type MakeOrderResponse = Promise<(
    OrderSucceedResponseSchema
    | OrderFailedResponseSchema
)>;

export const makeOrder = async (
    body: OrderRequestSchema,
): MakeOrderResponse => {
    const input = v.parse(OrderRequestSchema, body);

    const raw = await fetch('http://o-complex.com:1337/order', {
        headers,
        method: HTTP_METHODS.POST,
        body: JSON.stringify({
            phone: `7${input.phone}`,
            cart: input.cart,
        }),
    });

    const json = await raw.json();

    const parsed = v.safeParse(OrderSucceedResponseSchema, json);
    if (parsed.success) return parsed.output;

    return v.parse(OrderFailedResponseSchema, json);
};