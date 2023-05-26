import { AiOutlineCloudUpload } from 'react-icons/ai'
import '../createQuestion/style.css'
import { useState } from 'react';
import { api } from '../../api';

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


    const handleSubmit = async () => {
        setIsLoading(true)

        if (!imageSelected ) return

        const ext = imageSelected.name.substring(imageSelected.name.lastIndexOf('.') + 1)

        await api.postForm(
            'bloodcollectors/create',
            {
                email,
                password,
                phoneNumber,
                adress: `${street} ${number} ${neighborhood}`,
                avatar: {
                    name: imageSelected?.name + '.' + ext,
                    uri: URL.createObjectURL(imageSelected),
                    type: imageSelected?.type,
                }
            })
    }


    return (
        <div className='py-10 px-20'>
            <h1 className='text-3xl font-bold text-red-700' >Cadastrar ponto de coleta</h1>
            <h3 className='text-xl '>/cadastrar ponto</h3>

            <div className='flex flex-col w-200 rounded-md p-5 bg-red-50 '>
                <div className='flex flex-row  mt-5 '>
                    <div className='flex flex-col px-5'>
                        <h4 className='font-semibold text-lg my-3 '>Informações básicas</h4>
                        <input
                            className='w-96 text-lg p-2 mt-3 outline-0 mx-4 rounded-md'
                            placeholder="Nome do ponto de coleta"
                            value={bloodCollectorName}
                            onChange={ev => setBloodCollectorName(ev.target.value)}
                            type="text" name="" id="" />
                        <input
                            className='w-96 text-lg p-2 mt-3 outline-0 mx-4 rounded-md'
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={ev => setEmail(ev.target.value)}
                        />
                        <input
                            className='w-96 text-lg p-2 mt-3 outline-0 mx-4 rounded-md'
                            placeholder="Senha"
                            type="password"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                        />

                    </div>
                    <div className='ml-40'>
                        <h4 className='font-semibold text-lg my-3 '>Avatar</h4>
                        <label className='flex overflow-hidden flex-col justify-center items-center text-red-700 cursor-pointer bg-white border-2 border-red-700 w-48 h-44 rounded-full' htmlFor="file-input">
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
                        className='w-96 text-lg p-2 mt-3 outline-0 mx-4 rounded-md'
                        placeholder="Telefone"
                        type="text"
                        value={phoneNumber}
                        onChange={ev => setPhoneNumber(ev.target.value)}
                    />
                </div>

                <div className=" px-5">
                    <h4 className='font-semibold text-lg my-3 '>Endereço</h4>
                    <div className='flex flex-row' >
                        <input
                            className='w-36 text-lg p-2 mt-3 outline-0 mx-4 rounded-md'
                            placeholder="Rua"
                            type="text"
                            value={street}
                            onChange={ev => setStreet(ev.target.value)}
                        />
                        <input
                            className='w-20 text-lg p-2 mt-3 outline-0 mx-4 rounded-md'
                            placeholder="Número"
                            type="text"
                            value={number}
                            onChange={ev => setNumber(ev.target.value)}
                        />
                        <input
                            className='w-36 text-lg p-2 mt-3 outline-0 mx-4 rounded-md'
                            placeholder="Bairro"
                            type="text"
                            value={neighborhood}
                            onChange={ev => setneighborhood(ev.target.value)}
                        />
                    </div>
                </div>

                <button className='bg-red-600 w-52 my-10 mx-5 text-white font-semibold py-2 rounded-sm'>
                    Cadastrar
                </button>
            </div>
        </div>
    );
}

export default CreateBloodCollectors;