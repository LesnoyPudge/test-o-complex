'use client';

import { makeOrder } from '@/api';
import { Button } from '@/components';
import { SuccessDialog } from './components';
import { OrderRequestSchema } from '@/schemas';
import { useCartStore, usePhoneStore } from '@/store';
import { useIsMounted } from '@lesnoypudge/utils-react';
import {
    AnyFieldApi,
    AnyFormApi,
    useForm,
    useStore,
} from '@tanstack/react-form';
import React, { FC, useEffect, useState } from 'react';
import * as v from 'valibot';
import { PatternFormat } from 'react-number-format';



const styles = {
    wrapper: 'flex flex-col gap-2',
    inputs: 'flex flex-wrap gap-[17px]',
    input: 'py-3 px-4 grow max-w-full',
    button: {
        base: 'py-3 px-[57px] grow',
        disabled: 'opacity-50',
    },
    panel: 'text-size-36 text-font-100 bg-panel-300 rounded-[15px]',
};

type FieldErrorProps = {
    field: AnyFieldApi;
};

const FieldError: FC<FieldErrorProps> = ({ field }) => {
    const isTouched = useStore(field.store, (v) => v.meta.isTouched);
    const isValid = useStore(field.store, (v) => v.meta.isValid);
    const errors = useStore(field.store, (v) => v.meta.errors);

    const shouldShowError = isTouched && !isValid;

    if (!shouldShowError) return null;

    const parsed = v.safeParse(v.object({
        message: v.string(),
    }), errors[0]);

    const errorMessage = parsed.success ? parsed.output.message : 'Неизвестно';

    return (
        <div className={styles.panel}>Ошибка: {errorMessage}</div>
    );
};

const SubmitButton: FC<{ form: AnyFormApi }> = ({ form }) => {
    const cart = useCartStore();
    const canSubmit = useStore(form.store, (v) => v.canSubmit);
    const isSubmitting = useStore(form.store, (v) => v.isSubmitting);

    const isDisabled = !cart.value.length || !canSubmit;

    return (
        <Button
            className={[
                styles.panel,
                styles.button.base,
                isDisabled ? styles.button.disabled : '',
            ].join(' ')}
            disabled={isDisabled}
            type='submit'
        >
            {isSubmitting ? 'загрузка...' : 'заказать'}
        </Button>
    );
};

export const CartForm: FC = () => {
    const { getIsMounted } = useIsMounted();
    const [shouldShowDialog, setShouldShowDialog] = useState(false);
    const cart = useCartStore();
    const phone = usePhoneStore();

    const fields = {
        cart,
        phone,
    };

    const Form = useForm({
        defaultValues: {
            phone: phone.value,
            cart: cart.value,
        },
        listeners: {
            onChange: ({ fieldApi }) => {
                if (!(fieldApi.name in fields)) return;

                const key = fieldApi.name as keyof typeof fields;

                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                fields[key].set(fieldApi.state.value);
            },
        },
        validators: {
            onMount: OrderRequestSchema,
            onChange: OrderRequestSchema,
            onSubmit: OrderRequestSchema,
        },
        onSubmit: async ({ value, formApi }) => {
            await makeOrder({
                cart: cart.value,
                phone: value.phone,
            });

            if (!getIsMounted()) return;

            cart.set([]);

            formApi.reset({
                phone: value.phone,
                cart: [],
            });

            setShouldShowDialog(true);
        },
    });

    useEffect(() => {
        Form.setFieldValue('cart', cart.value);
        Form.setFieldValue('phone', phone.value);

        void Form.validate('change');
    }, [Form, cart.value, phone.value]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        void Form.handleSubmit();
    };

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit}>
            <SuccessDialog
                isOpen={shouldShowDialog}
                close={() => setShouldShowDialog(false)}
            />

            <div className={styles.inputs}>
                <Form.Field name='phone'>
                    {(field) => (
                        <PatternFormat
                            className={`${styles.panel} ${styles.input}`}
                            format='+7 (###) ### ##-##'
                            allowEmptyFormatting
                            mask='_'
                            type='tel'
                            name={field.name}
                            aria-label='Номер телефона'
                            required
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onValueChange={({ value }) => {
                                field.handleChange(value);
                            }}
                        />
                    )}
                </Form.Field>

                <SubmitButton form={Form}/>
            </div>

            <Form.Field name='phone'>
                {(field) => <FieldError field={field}/>}
            </Form.Field>
        </form>
    );
};