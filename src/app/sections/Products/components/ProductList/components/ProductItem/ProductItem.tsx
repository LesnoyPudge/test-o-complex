'use client';

import { ProductSchema } from '@/schemas';
import { Button, ErrorBoundary } from '@/src/components';
import { useCartStore } from '@/src/store';
import Image from 'next/image';
import React, { FC } from 'react';



type ProductItemProps = {
    product: ProductSchema;
};

const styles = {
    wrapper: 'bg-panel-100 p-2.5 flex flex-col gap-2 text-font-200 rounded-[15px]',
    imageContainer: 'relative aspect-[281/366] max-h-[366px] w-auto h-full rounded-[15px] overflow-hidden text-font-200',
    image: 'object-cover',
    title: 'truncate text-size-36',
    desc: 'text-size-24 line-clamp-[8] text-center',
    price: 'text-size-36 mt-auto mb-2',
    buyPanels: 'rounded-[15px] bg-panel-300 text-font-100 p-3 text-center',
    widePanel: 'w-full min-w-0',
    square: 'shrink-0 size-[60px]',
};

export const ProductItem: FC<ProductItemProps> = ({
    product,
}) => {
    const cart = useCartStore();

    const cartItem = cart.value.find((item) => item.id === product.id);

    const handleAdd = () => {
        const prev = cart.value;

        if (!cartItem) {
            cart.set([
                ...prev,
                {
                    id: product.id,
                    quantity: 1,
                },
            ]);

            return;
        }

        const newCart = prev.map((v) => {
            if (v.id !== product.id) return v;

            return {
                id: v.id,
                quantity: v.quantity + 1,
            };
        });

        cart.set(newCart);
    };

    const handleRemove = () => {
        if (!cartItem) return;

        const prev = cart.value;

        if (cartItem.quantity <= 1) {
            cart.set(prev.filter((v) => v.id !== product.id));

            return;
        }

        cart.set(prev.map((v) => {
            if (v.id !== product.id) return v;

            return {
                id: v.id,
                quantity: v.quantity - 1,
            };
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Number.parseInt(e.target.value || '0');
        const prev = cart.value;

        if (newQuantity <= 0) {
            cart.set(prev.filter((v) => v.id !== product.id));
            return;
        }

        const newCart = prev.map((v) => {
            if (v.id !== product.id) return v;

            return {
                id: v.id,
                quantity: newQuantity,
            };
        });

        cart.set(newCart);
    };

    return (
        <div className={styles.wrapper}>
            <ErrorBoundary>
                <div className={styles.imageContainer}>
                    <Image
                        className={styles.image}
                        src={product.image_url}
                        alt={`продукт ${product.title}`}
                        // priority
                        loading='lazy'
                        fill
                        sizes='300px'
                    />
                </div>
            </ErrorBoundary>

            <h2
                className={styles.title}
                title={product.title}
            >
                {product.title}
            </h2>

            <div className={styles.desc}>
                {product.description}
            </div>

            <div className={styles.price}>
                <>цена: {product.price}₽</>
            </div>

            {!cartItem?.quantity && (
                <Button
                    className={`${styles.buyPanels} ${styles.widePanel}`}
                    onClick={handleAdd}
                >
                    <>купить</>
                </Button>
            )}

            {cartItem?.quantity && (
                <div className='flex gap-2'>
                    <Button
                        className={`${styles.buyPanels} ${styles.square}`}
                        onClick={handleRemove}
                    >
                        <>-</>
                    </Button>

                    <input
                        className={`${styles.buyPanels} ${styles.widePanel}`}
                        name='quantity'
                        type='text'
                        step='1'
                        inputMode='numeric'
                        pattern='\d*'
                        maxLength={3}
                        minLength={0}
                        min={0}
                        value={cartItem.quantity ?? ''}
                        onChange={handleChange}
                    />

                    <Button
                        className={`${styles.buyPanels} ${styles.square}`}
                        onClick={handleAdd}
                    >
                        <>+</>
                    </Button>
                </div>
            )}
        </div>
    );
};