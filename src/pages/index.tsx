import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import logoImg from '../../public/logo.svg';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); //Habilita/Desabilita icone do botão acessar

    const { signIn } = useContext(AuthContext);

    async function handleLogin(event: FormEvent) {
        event.preventDefault();

        if (email === '' || password === ''){
            toast.warning("Preencha todos os campos!");
            return;
        }
        setLoading(true);
        let data = {
            email,
            password
        }
        await signIn(data);
        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>SujeitoPizza - Faça o seu login</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Sujeito Pizzaria" priority={false}/>

                <div className={styles.login}>
                    <form onSubmit={handleLogin}>
                        <Input
                            placeholder='Digite o seu e-mail'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder='Digite a sua senha'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Acessar
                        </Button>
                    </form>
                    <Link href="/signup" className={styles.text}>
                        Não possui uma conta? Cadastre-se!
                    </Link>
                </div>
            </div>
        </>
    )
}
