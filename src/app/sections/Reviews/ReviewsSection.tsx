import { getReviews } from '@/api';
import { ReviewsList } from './components';
import {
    PaginationBreadcrumbs,
    PaginationProvider,
} from '@/src/components/entities/Pagination';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';



const DOMPurify = createDOMPurify(new JSDOM('').window);

const styles = {
    wrapper: 'grid gap-[34px] grid-cols-[repeat(auto-fit,min(100%,468px))] justify-center mt-[105px]',
};

export const ReviewsSection = async () => {
    const rawReviews = await getReviews();
    const reviews = rawReviews.map((review) => {
        return {
            ...review,
            text: DOMPurify.sanitize(review.text),
        };
    });

    return (
        <PaginationProvider
            pageSize={2}
            total={rawReviews.length}
        >
            <>
                <div className={styles.wrapper}>
                    <ReviewsList query={reviews}/>
                </div>

                <PaginationBreadcrumbs/>
            </>
        </PaginationProvider>
    );
};