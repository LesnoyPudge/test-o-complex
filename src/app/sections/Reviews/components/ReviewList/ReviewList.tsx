'use client';

import { ReviewItem } from './components';
import { usePagination } from '@/src/components/entities/Pagination';
import { ReviewsSchema } from '@/src/schemas';
import { FC } from 'react';



export const ReviewsList: FC<{ query: ReviewsSchema }> = ({
    query,
}) => {
    const pagination = usePagination();

    const start = (pagination.page - 1) * 2;
    const end = Math.min(start + 2, query.length);

    const subList = query.slice(start, end);

    return subList.map((review) => (
        <ReviewItem key={review.id} review={review}/>
    ));
};