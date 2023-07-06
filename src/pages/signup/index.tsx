import { useState, FormEvent, useContext } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import logoImg from '../../../public/logo.svg';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { AuthContext } from '../../contexts/AuthContext';

export default function Signup() {

    const { signUp } = useContext(AuthContext);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (name === '' || email === '' || password === '') {
            toast.warning("Preencha todos os campos!");
            return;
        }
        setLoading(true);
        let data = {
            name,
            email,
            password
        }
        await signUp(data);
        setLoading(false);
    }

    return (
        <>
            <Head>
                <title>Faça o seu cadastro agora!</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

                <div className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form onSubmit={handleSubmit}>
                        <Input
                            placeholder='Digite o nome'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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
