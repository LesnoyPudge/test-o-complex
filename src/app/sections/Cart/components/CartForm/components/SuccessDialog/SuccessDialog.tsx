/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { Button, PortalToOverlay } from '@/components';
import { Focus } from '@lesnoypudge/utils-react';
import { FC } from 'react';



type SuccessDialogProps = {
    isOpen: boolean;
    close: VoidFunction;
};

const styles = {
    wrapper: 'fixed inset-0 grid items-center',
    backdrop: 'fixed -z-10 inset-0 bg-panel-300/50 pointer-events-auto',
    inner: 'p-6 rounded-[15px] bg-panel-100 text-font-200 pointer-events-auto text-size-36 m-auto flex flex-col gap-4',
    button: 'p-2 bg-panel-300 text-font-100 rounded-[15px]',
};

export const SuccessDialog: FC<SuccessDialogProps> = ({
    isOpen,
    close,
}) => {
    return (
        <PortalToOverlay enabled={isOpen}>
            <Focus.Lock>
                <div className={styles.wrapper}>
                    <div
                        className={styles.backdrop}
                        onClick={close}
                    >
                    </div>

                    <div
                        className={styles.inner}
                        role='dialog'
                        aria-label='Успешный заказ'
                    >
                        <div>Заказ успешно отправлен</div>

                        <Button
                            className={styles.button}
                            onClick={close}
                        >
                            <>Закрыть</>
                        </Button>
                    </div>
                </div>
            </Focus.Lock>
        </PortalToOverlay>
    );
};