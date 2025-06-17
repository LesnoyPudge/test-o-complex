'use client';

import { usePagination } from '@/src/components/entities/Pagination';
import { ProductItem } from './components';
import { ProductsResponseSchema } from '@/schemas';
import { FC, useEffect } from 'react';
import { useFetch } from '@/hooks';
import { getFixedSizeProducts } from '@/src/api';



type ProductListProps = {
    query: ProductsResponseSchema;
};

export const ProductList: FC<ProductListProps> = ({
    query,
}) => {
    const pagination = usePagination();

    const { data, trigger } = useFetch(query, () => {
        return getFixedSizeProducts(pagination.page);
    }, true);

    useEffect(() => {
        trigger();
    }, [pagination.page, trigger]);

    return data.items.map((product) => (
        <ProductItem key={product.id} product={product}/>
    ));
};