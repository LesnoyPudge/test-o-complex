import { FC, PropsWithChildren } from 'react';



const styles = {
    wrapper: 'max-w-[983px] w-full mx-auto',
};

export const Container: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
};