import { CartForm, CartTable } from './components';
import { sleep } from '@lesnoypudge/utils';



const styles = {
    wrapper: 'mt-[164px] md:mt-[243px] p-2.5 bg-panel-100 text-font-200 rounded-[15px] flex flex-col gap-2',
    heading: 'text-size-36 text-center md:text-left',
};

export const CartSection = async () => {
    await sleep(5_000);

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.heading}>
                <>Добавленные товары</>
            </h2>

            <CartTable/>

            <CartForm/>
        </div>
    );
};