import { AiOutlineCloudUpload } from 'react-icons/ai'
import '../createQuestion/style.css'
import { useState } from 'react';
import { api } from '../../api';
import Spinner from '../../components/Spinner';
import { useUser } from '../../context/authContext';

function CreateBloodCollectors() {

    const [bloodCollectorName, setBloodCollectorName] = useState('')
    const [imageSelected, setImageSelected] = useState<File>()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [street, setStreet] = useState('')
    const [number, setNumber] = useState('')
    const [neighborhood, setneighborhood] = useState('')

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<undefined | { message: string, code: string }>(undefined)

    const user = useUser()

    const handleSubmit = async () => {
        if (!imageSelected || isLoading || !bloodCollectorName || !imageSelected || !email || !password || !phoneNumber || !street || !number || !neighborhood) return

        setIsLoading(true)


        api.postForm(
            'bloodcollectors/create',
            {
                email,
                username: bloodCollectorName,
                password,
                phoneNumber,
                adress: `${street} ${number} ${neighborhood}`,
                avatar: imageSelected
            },
            {
                headers: {
                    Authorization: 'Bearer ' + user.user?.token
                }
            })
            .then(() => {
                setBloodCollectorName('')
                setImageSelected(undefined)
                setEmail('')
                setPassword('')
                setPhoneNumber('')
                setStreet('')
                setNumber('')
                setneighborhood('')
            })
            .catch((err) => {
                setError(err.response.data);
            })

            .finally(() => {
                setIsLoading(false)
            })

    }


    return (
        <div className='w-screen  md:w-[70rem] p-4 sm:py-10 sm:px-20 '>
            <h1 className='text-3xl font-bold text-red-700' >Cadastrar ponto de coleta</h1>
            <h3 className='text-xl '>/cadastrar ponto</h3>

            <div className='flex flex-col w-full sm:w-[45rem] md:w-[70rem] rounded-md p-2 bg-red-50  '>
                <div className='flex flex-col sm:flex-row mt-5 '>
                    <div className='flex flex-col px-5'>
                        <h4 className='font-semibold text-lg my-3 '>Informações básicas</h4>
                        <input
                            className='sm:ml-7 p-3 my-3 sm:w-96 rounded-md  outline-0'
                            placeholder="Nome do ponto de coleta"
                            value={bloodCollectorName}
                            onChange={ev => setBloodCollectorName(ev.target.value)}
                            type="text" name="" id="" />
                        <input
                            className='sm:ml-7 p-3 my-3 sm:w-96 rounded-md  outline-0'
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                        />
                        {
                            error && ['02', '13'].includes(error.code) && <p className='text-red-700'>{error.message}</p>
                        }
                        <input
                            className='sm:ml-7 p-3 my-3 sm:w-96 rounded-md  outline-0'
                            placeholder="Senha"
                            type="password"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                        />
                        {
                            error && ['03'].includes(error.code) && <p className='text-red-700'>{error.message}</p>
                        }
                    </div>
                    <div className='ml-5 sm:ml-22'>
                        <h4 className='font-semibold text-lg my-3 '>Avatar</h4>
                        <label className='flex overflow-hidden flex-col justify-center items-center text-red-700 cursor-pointer bg-white border-2 border-red-700  w-48 h-44 rounded-full' htmlFor="file-input">
                            {
                                imageSelected ?
                                    <img className='w-full h-full' src={URL.createObjectURL(imageSelected)} alt="" />
                                    :

                                    <>
                                        <p className='text-red-600 text-3xl'><AiOutlineCloudUpload /></p>
                                        Upload
                                    </>
                            }

                        </label>
                        <input
                            onChange={(ev) => {
                                if (ev.target.files && ev.target.files[0]) {
                                    setImageSelected(ev.target.files[0])
                                    console.log(ev.target.files[0])
                                }
                            }}
                            id='file-input'
                            type='file'
                            className='hidden'
                        />
                    </div>
                </div>
                <div className=" px-5">
                    <h4 className='font-semibold text-lg my-3 '>Contato</h4>
                    <input
                        className='sm:ml-7 p-3 my-3 sm:w-96 rounded-md  outline-0'
                        placeholder="Telefone"
                        type="text"
                        value={phoneNumber}
                        onChange={ev => setPhoneNumber(ev.target.value)}
                    />
                </div>

                <div className=" px-5">
                    <h4 className='font-semibold text-lg my-3 '>Endereço</h4>
                    <div className='flex flex-col sm:flex-row' >
                        <input
                            className='sm:ml-7 p-3 my-3 sm:w-96 rounded-md  outline-0   '
                            placeholder="Rua"
                            type="text"
                            value={street}
                            onChange={ev => setStreet(ev.target.value)}
                        />
                        <input
                            className='sm:ml-7 p-3 my-3 sm:w-96 rounded-md  outline-0'
                            placeholder="Número"
                            type="text"
                            value={number}
                            onChange={ev => setNumber(ev.target.value)}
                        />
                        <input
                            className='sm:ml-7 p-3 my-3 sm:w-96 rounded-md  outline-0   '
                            placeholder="Bairro"
                            type="text"
                            value={neighborhood}
                            onChange={ev => setneighborhood(ev.target.value)}
                        />
                    </div>
                </div>

                <button onClick={handleSubmit} className=' flex justify-center items-center bg-red-600 w-52 my-10 mx-5 text-white font-semibold py-2 rounded-sm'>
                    {isLoading ? <Spinner /> : 'Cadastrar'}
                </button>
            </div>
        </div>
    );
}

export default CreateBloodCollectors;