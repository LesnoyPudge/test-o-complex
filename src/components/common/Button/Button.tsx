'use client';

import React, { FC, PropsWithChildren } from 'react';



type ButtonProps = (
    PropsWithChildren
    & {
        className?: string;
        type?: 'button' | 'submit';
        disabled?: boolean;
        onClick?: VoidFunction;
    }
);

const styles = {
    wrapper: 'cursor-pointer disabled:cursor-not-allowed min-w-0 truncate',
};

export const Button: FC<ButtonProps> = ({
    className = '',
    type = 'button',
    disabled = false,
    onClick,
    children,
}) => {
    const handleClick = (e: React.MouseEvent) => {
        if (!onClick) return;

        e.preventDefault();

        onClick();
    };

    return (
        <button
            className={`${styles.wrapper} ${className}`}
            onClick={handleClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
};