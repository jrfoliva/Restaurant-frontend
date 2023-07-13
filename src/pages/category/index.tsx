import { useState, FormEvent } from 'react';

import styles from './styles.module.scss';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';


export default function Category(){
    const [name, setName] = useState('');
    

    async function handleRegister(event: FormEvent){
        event.preventDefault();
        if(name===''){
            toast.warning("Preencha o nome para a categoria!");
            return;
        }
        
        const apiClient = setupAPIClient();
        try {
            await apiClient.post('/category', {
                name: name
            });
            toast.success("Categoria cadastrada com sucesso!");
            setName('');
        } catch (error) {
            toast.error("Falha ao cadastrar a categoria. "+ error.message)
        }
    }
    
    return (
        <>
        <Head>
            <title>Nova Categoria - Sujeito Pizzaria</title>
        </Head>
        <div>
            <Header />
            
            <main className={styles.container}>
                <h1>Cadastrar Categorias</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder='Digite o nome da categoria'
                        className={styles.input}
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />

                    <button type='submit' className={styles.buttonAdd}>
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
        </>
    )
}