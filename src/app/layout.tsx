import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/router/components';
import { OVERLAY_LAYER_ID } from '@/vars';



const inter = Inter({
    variable: '--font-inter',
    subsets: ['cyrillic'],
});

export const metadata: Metadata = {
    title: 'Тестовое - Чуйкин Александр',
    description: 'Test app by LesnoyPudge',
};

const styles = {
    body: `${inter.variable} antialiased text-size-24 font-normal bg-panel-300 text-font-100`,
    wrapper: 'min-h-dvh pt-[14px] px-[14px] pb-[227px] md:pt-[55px] md:px-[55px] md:pb-[388px]',
    overlay: 'fixed inset-0 pointer-events-none',
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang='ru'>
            <body className={styles.body}>
                <div className={styles.wrapper}>
                    <Header/>

                    {children}
                </div>

                <div className={styles.overlay} id={OVERLAY_LAYER_ID}></div>
            </body>
        </html>
    );
};

export default RootLayout;