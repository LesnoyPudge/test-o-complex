'use client';

import { Button } from '@/src/components/common';
import {
    createContext,
    FC,
    PropsWithChildren,
    useContext,
    useState,
} from 'react';



type PaginationContext = {
    page: number;
    total: number;
    pageSize: number;
    setPage: (page: number) => void;
};

const PaginationContext = createContext<PaginationContext>(
    undefined as unknown as PaginationContext,
);

export const usePagination = () => {
    return useContext(PaginationContext);
};

type ProviderProps = (
    PropsWithChildren
    & {
        total: number;
        pageSize: number;
    }
);

export const PaginationProvider: FC<ProviderProps> = ({
    pageSize,
    total,
    children,
}) => {
    const [pageCount, setPageCount] = useState(1);

    const value: PaginationContext = {
        page: pageCount,
        total,
        pageSize,
        setPage: setPageCount,
    };

    return (
        <PaginationContext value={value}>
            {children}
        </PaginationContext>
    );
};

const styles = {
    wrapper: 'flex gap-2 bg-panel-100 w-full justify-center rounded-[15px] p-2 my-2',
    panel: 'p-2 rounded-[15px] bg-panel-300 text-font-100 aspect-square',
};

export const PaginationBreadcrumbs: FC = () => {
    const pagination = usePagination();

    const totalPages = Math.ceil(pagination.total / pagination.pageSize);

    const isPrevDisabled = pagination.page === 1;
    const isNextDisabled = pagination.page === totalPages;

    return (
        <div className={styles.wrapper}>
            <Button
                className={styles.panel}
                onClick={() => pagination.setPage(pagination.page - 1)}
                disabled={isPrevDisabled}
            >
                {'<<'}
            </Button>

            <Button
                className={styles.panel}
                onClick={() => pagination.setPage(1)}
                disabled={pagination.page === 1}
            >
                {1}
            </Button>

            <div className={styles.panel}>
                {pagination.page}
            </div>

            <Button
                className={styles.panel}
                onClick={() => pagination.setPage(totalPages)}
                disabled={pagination.page === totalPages}
            >
                {totalPages}
            </Button>

            <Button
                className={styles.panel}
                onClick={() => pagination.setPage(pagination.page + 1)}
                disabled={isNextDisabled}
            >
                {'>>'}
            </Button>
        </div>
    );
};