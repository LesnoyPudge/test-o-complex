import { FC } from 'react';



const styles = {
    wrapper: 'text-size-40 bg-panel-200 text-center rounded-[15px] md:text-size-96 text-font-100 max-w-[1442px] mx-auto w-full px-4',
};

export const Header: FC = () => {
    return (
        <div className={styles.wrapper}>
            <h1>тестовое задание</h1>
        </div>
    );
};