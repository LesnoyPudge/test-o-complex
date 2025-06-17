'use client';

import { ErrorBoundary as ErrorBoundaryLib } from '@lesnoypudge/utils-react';
import { FC, PropsWithChildren, useContext } from 'react';
import { Button } from '@/components';



const styles = {
    wrapper: 'bg-panel-100 text-font-200 text-center py-7 my-5',
};

const ErrorComponent = () => {
    const {
        error,
        resetErrorBoundary,
        counter,
    /* @ts-expect-error react types mismatch */
    } = useContext(ErrorBoundaryLib.Context);

    const handleReset = () => {
        if (counter.get() >= 3) {
            window.location.reload();
            return;
        }

        counter.inc();

        resetErrorBoundary();
    };

    return (
        <div className={styles.wrapper}>
            <div>Возникла ошибка: {String(error).slice(0, 30)}</div>

            <Button onClick={handleReset}>
                <>Перезагрузить</>
            </Button>
        </div>
    );
};

export const ErrorBoundary: FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <ErrorBoundaryLib.Node FallbackComponent={ErrorComponent}>
            {/* @ts-expect-error react types mismatch */}
            {children}
        </ErrorBoundaryLib.Node>
    );
};