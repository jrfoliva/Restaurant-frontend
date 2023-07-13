import { canSSAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import { Header } from '../../components/Header';

export default function Dashboard(){
    return (
        <>
        <Head>
            <title>Painel - Sujeito Pizzaria</title>
        </Head>
        <div>
        <Header />

        </div>
        </>
    )
}

export const getServerSideProps = canSSAuth(async (ctx) => {
    return {
        props: {

        }
    }
});