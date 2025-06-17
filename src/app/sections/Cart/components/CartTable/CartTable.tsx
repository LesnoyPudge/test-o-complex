'use client';

import { getProductsByIds } from '@/api';
import { CartTableRow } from './components';
import { useCartStore } from '@/store';
import { invariant } from '@lesnoypudge/utils';
import { FC, useEffect } from 'react';
import { useFetch } from 'src/hooks';



export const CartTable: FC = () => {
    const cart = useCartStore();

    const fetchAndNormalize = async () => {
        if (!cart.value.length) return null;

        return await getProductsByIds(
            cart.value.map(({ id }) => id),
        ).then((v) => {
            return Object.fromEntries(v.map((product) => [
                product.id,
                product,
            ]));
        });
    };

    const {
        data,
        isLoading,
        trigger,
    } = useFetch(null, fetchAndNormalize, true);

    useEffect(() => {
        trigger();
    }, [cart.value, trigger]);

    if (!cart.value.length) return (
        <div>Корзина пуста</div>
    );

    if (!data && isLoading) return (
        <div>Загрузка товаров...</div>
    );

    if (!data && !isLoading) return (
        <div>Товары не найдены</div>
    );

    invariant(data);

    return (
        <div>
            {cart.value.map((cartItem) => (
                data[cartItem.id] ? (
                    <CartTableRow
                        key={data[cartItem.id].id}
                        product={data[cartItem.id]}
                        quantity={cartItem.quantity}
                    />
                ) : 'загрузка'
            ))}
        </div>
    );
};