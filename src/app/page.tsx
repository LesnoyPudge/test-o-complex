import { Container, ErrorBoundary } from '@/components';
import {
    CartLoader,
    CartSection,
    ProductsLoader,
    ProductsSection,
    ReviewsSection,
} from './sections';
import { FC, Suspense } from 'react';



export const dynamic = 'force-dynamic';

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