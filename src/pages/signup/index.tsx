import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import logoImg from '../../../public/logo.svg';
import Link from 'next/link';

export default function Signup() {
    return (
        <>
            <Head>
                <title>Faça o seu cadastro agora!</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form>
                        <Input
                            placeholder='Digite o nome'
                            type='text'
                        />

                        <Input
                            placeholder='Digite o seu e-mail'
                            type='text'
                        />

                        <Input
                            placeholder='Digite a sua senha'
                            type='password'
                        />

                        <Button
                            type="submit"
                            loading={false}
                        >
                            Cadastrar
                        </Button>
                    </form>
                    <Link href="/" className={styles.text}>
                        Já possui conta? Faça login!
                    </Link>
                </div>
            </div>
        </>
    )
}
