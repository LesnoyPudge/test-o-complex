'use client';

// import { createLocalStorageHook } from '@lesnoypudge/utils-react';
import { CartSchema, PhoneNumberStringSchema } from '@/schemas';
import { LocalStorage } from '@lesnoypudge/utils-web';
import { useEffect, useRef, useState } from 'react';



type Store = {
    phone: PhoneNumberStringSchema;
    cart: CartSchema;
};

const useLocalStorage = <_Key extends keyof Store>(
    key: _Key,
    defaultValue: Store[_Key],
) => {
    const defaultValueRef = useRef(defaultValue);
    const [data, setData] = useState(defaultValue);
    const apiRef = useRef<LocalStorage<Store>>(null);

    useEffect(() => {
        defaultValueRef.current = defaultValue;
    }, [defaultValue]);

    useEffect(() => {
        const api = new LocalStorage<Store>();

        apiRef.current = api;

        const savedValue = api.get(key, defaultValueRef.current) as Store[_Key];

        setData(savedValue);
        api.set(key, savedValue);

        return api.onChange(key, (value) => {
            if (value === undefined) {
                setData(defaultValueRef.current);
                return;
            }

            setData(value);
        });
    }, [key]);

    const set = (value: Store[_Key]) => {
        const api = apiRef.current;
        if (!api) return;

        api.set(key, value);
    };

    return {
        value: data,
        set,
    };
};

// const useStore = createLocalStorageHook<{
//     phone: PhoneNumberStringSchema;
//     cart: CartSchema;
// }>();

const defaultCart: CartSchema = [];

export const usePhoneStore = () => useLocalStorage('phone', '');

export const useCartStore = () => useLocalStorage('cart', defaultCart);