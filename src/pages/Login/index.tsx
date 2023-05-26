import React, { useState, useRef } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../api/login';
import Logo from '../../assets/logo sangue bom.svg'
import Spinner from '../../components/Spinner';
import { AxiosError } from 'axios';
import { useUser } from '../../context/authContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    const { setUser } = useUser()

    const { mutate, isLoading, error } = useMutation({
        mutationFn: () => login(email, password),
        onError: (err: AxiosError<{ message: string, code: string }>) => console.log(err.response.data),
        onSuccess: (res) => setUser(res)
    })

    const handleLogin = () => {
        if (email && password) mutate()
    }

    return (
        <div className='flex flex-row items-center justify-center sm:max-2xl:justify-between'>
            <div className='flex flex-col w-full sm:w-2/3  md:max-2xl:w-4/12 justify-center items-center  bg-white h-screen'>

                <h1 className='text-4xl font-bold py-5'>Login</h1>
                <div className='w-60 h-0.5 bg-black'></div>

                <div className='w-full p-8'>
                    <h3 className='text-2xl font-bold'>Email</h3>
                    <Input
                        setValue={(txt) => setEmail(txt)}
                        value={email}
                        leftIcon={<h3> <AiOutlineMail className='mr-4' /> </h3>}
                        type='email'
                        placeholder='Informe seu email'
                    />
                    {
                        error?.response &&
                        ['05', '13'].includes(error?.response?.data.code) &&
                        <p className='text-red-700'>{error?.response?.data.message}</p>
                    }
                </div>


                <div className='w-full p-8'>
                    <h3 className='text-2xl font-bold'>Senha</h3>
                    <Input
                        setValue={(txt) => setPassword(txt)}
                        value={password}
                        type='password'
                        leftIcon={<h3> <AiFillLock className='mr-4' /> </h3>}
                        placeholder='Informe sua senha'
                    />
                    {
                        error?.response &&
                        ['03'].includes(error?.response?.data.code) &&
                        <p className='text-red-700'>{error?.response?.data.message}</p>
                    }
                </div>

                <div className='w-full px-10 mt-10'>
                    <Button onClick={handleLogin}>{isLoading ? <Spinner /> : 'Entrar'}</Button>
                </div>


            </div>

            <div className='flex  items-center justify-center w-0  h-screen sm:w-full bg-red-700'>
                <div className='bg-red-300 rounded-full'>
                    <img src={Logo} alt="Logo sangue bom" />
                </div>
            </div>
            
        </div>
    )
}

export default Login;