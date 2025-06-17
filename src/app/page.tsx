import { Container, ErrorBoundary } from '@/components';
import {
    CartLoader,
    CartSection,
    ProductsLoader,
    ProductsSection,
    ReviewsSection,
} from './sections';
import { FC, Suspense } from 'react';
// import dynamic from 'next/dynamic';

export const dynamic = 'force-dynamic';

// const ProductsSection = dynamic(() => (
//     import('./sections/Products/ProductsSection')
//         .then((v) => v.ProductsSection)
// ));

// const CartSection = dynamic(() => (
//     import('./sections/Cart/CartSection')
//         .then((v) => v.CartSection)
// ));

const IndexPage: FC = () => {
    return (
        <>
            <Container>
                <ErrorBoundary>
                    <ReviewsSection/>
                </ErrorBoundary>
            </Container>

            <Container>
                <ErrorBoundary>
                    <Suspense fallback={<CartLoader/>}>
                        <CartSection/>
                    </Suspense>
                </ErrorBoundary>
            </Container>

            <Container>
                <ErrorBoundary>
                    <Suspense fallback={<ProductsLoader/>}>
                        <ProductsSection/>
                    </Suspense>
                </ErrorBoundary>
            </Container>
        </>
    );
};

export default IndexPage;