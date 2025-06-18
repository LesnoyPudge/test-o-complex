import Link from 'next/link';



const styles = {
    wrapper: 'bg-panel-100 text-size-36 text-font-200 p-4 rounded-[15px] mt-4 text-center grid gap-4',
    link: 'underline',
};

const NotFound = () => {
    return (
        <div className={styles.wrapper}>
            <h2>Страница не найдена</h2>

            <Link className={styles.link} href='/'>
                <>Перейти на главную</>
            </Link>
        </div>
    );
};

export default NotFound;