import { getFixedSizeProducts } from '@/api';
import { ProductList } from './components';
import { sleep } from '@lesnoypudge/utils';
import {
    PaginationBreadcrumbs,
    PaginationProvider,
} from '@/src/components/entities/Pagination';
import { FETCH_PRODUCTS_SIZE } from '@/vars';



const styles = {
    wrapper: 'mt-[45px]',
    grid: 'grid gap-9 grid-cols-[repeat(auto-fit,minmax(min(100%,301px),1fr))] justify-center',
};

export const ProductsSection = async () => {
    await sleep(5_000);

    const products = await getFixedSizeProducts(1);

    return (
        <div className={styles.wrapper}>
            <PaginationProvider
                pageSize={FETCH_PRODUCTS_SIZE}
                total={products.total}
            >
                <div className={styles.grid}>
                    <ProductList query={products}/>
                </div>

                <PaginationBreadcrumbs/>
            </PaginationProvider>
        </div>
    );
};