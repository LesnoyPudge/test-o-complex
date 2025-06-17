import { ReviewSchema } from '@/schemas';
import { FC } from 'react';



type ReviewItemProps = {
    review: ReviewSchema;
};

const styles = {
    wrapper: 'rounded-[15px] p-[27px] bg-panel-100 text-font-200 text-size-24',
};

export const ReviewItem: FC<ReviewItemProps> = ({
    review,
}) => {
    return (
        <div className={styles.wrapper}>
            <h2>Отзыв {review.id}</h2>

            <p>Полученный с api</p>

            <p>HTML</p>

            <div dangerouslySetInnerHTML={{
                __html: review.text,
            }}>
            </div>
        </div>
    );
};