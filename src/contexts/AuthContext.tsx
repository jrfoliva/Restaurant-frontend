import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import Router from 'next/router';


type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProvideProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    } catch {
        toast.error("Erro ao deslogar usuáro!");
    }
}

export function AuthProvider({ children }: AuthProvideProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;


    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/session", {
                email,
                password
            });

            //console.log(response.data);
            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mês
                path: "/" //Quais caminhos terão acesso ao cookie
            });

            setUser({
                id,
                name,
                email
            })

            // Passar para as próximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success("Bem vindo ao sistema!");
            // Redirecionar para a nossa página de dashboard
            Router.push('/dashboard');


        } catch {
            toast.error("Erro na tentativa de login.");
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            });
            toast.success("Cadastrado realizado com sucesso!");
            Router.push("/");
        } catch (error) {
            toast.error("Erro ao cadastrar o usuário!");
            // console.log("Erro ao cadastrar - ", error)
        }
        
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}