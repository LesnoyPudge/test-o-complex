import { FC } from 'react';



const styles = {
    wrapper: 'animate-pulse w-full rounded-[8px] bg-panel-200 my-4',
};

export const Placeholder: FC<{
    className?: string;
}> = ({
    className,
}) => {
    return <div className={`${styles.wrapper} ${className}`}></div>;
};