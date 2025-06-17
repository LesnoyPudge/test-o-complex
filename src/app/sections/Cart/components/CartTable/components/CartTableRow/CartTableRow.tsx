import { ProductSchema } from '@/schemas';
import { FC } from 'react';



type CartTableRowProps = {
    product: ProductSchema;
    quantity: number;
};

const styles = {
    row: 'flex justify-start gap-8',
    nameCol: 'truncate min-w-0',
    stable: 'shrink-0',
};

export const CartTableRow: FC<CartTableRowProps> = ({
    quantity,
    product,
}) => {
    return (
        <div className={styles.row}>
            <div
                className={styles.nameCol}
                title={product.title}
            >
                {product.title}
            </div>

            <div className={styles.stable}>
                <>x{quantity}</>
            </div>

            <div className={styles.stable}>
                <>{product.price * quantity}₽</>
            </div>
        </div>
    );
};