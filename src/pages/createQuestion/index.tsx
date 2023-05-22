import { useEffect, useState } from 'react';
import './style.css'
import { useMutation } from 'react-query';
import { api } from '../../api';
import { useUser } from '../../context/authContext';
import QuestionItem from '../../components/QuestionItem';
import Spinner from '../../components/Spinner';



export type QuestionType = { questions: string, answare: string, id: string }

function CreateQuestion() {

    const [question, setQuestion] = useState('')
    const [answare, setAnsware] = useState('')
    const [data, setData] = useState<QuestionType[]>([])
    const [isEdit, setIsEditing] = useState<string | ''>()
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        if (!question || !answare) return

        setIsLoading(true)

        if (!!isEdit) {
            await api.put('questions', { answare, question, id: isEdit }, { headers: { Authorization: 'Bearer ' + user?.token } })
            setIsEditing(undefined)
        } else {
            await api.post('questions', { questions: question, answare }, { headers: { Authorization: 'Bearer ' + user?.token ?? '' } })
        }

        await getQuestions()
        setAnsware('')
        setQuestion('')
        setIsLoading(false)
    }

    const getQuestions = async () => {
        const res = await api.get<QuestionType[]>('questions', { headers: { Authorization: 'Bearer ' + user?.token || '' } })
        setData([...res.data])
    }

    const handleEdit = async (questionObject: QuestionType) => {
        setIsEditing(questionObject.id)
        setAnsware(questionObject.answare)
        setQuestion(questionObject.questions)
    }

    const handleDelete = async (id: string) => {
        setData(item => {
            const index = item.findIndex(v => v.id === id)

            if (index > -1) {
                item.splice(index, 1)
            }
            return [...item]

        })
        await api.delete(`questions?id=${id}`, { headers: { Authorization: 'Bearer ' + user?.token ?? '' } })
    }

    useEffect(() => {
        getQuestions()
    }, [])

    return (
        <div className="bg-black">
            <div className="p-20 bg-white ">
                <h2 className="text-2xl text-red-700 font-bold">Criar uma pergunta</h2>
                <p className="text-black">/criarpergunta</p>

                <div className="flex flex-col my-10 p-7 bg-red-100 rounded-md w-200">
                    <h3 className="font-black font-semibold text-xl ">Dúvidas</h3>
                    <input
                        className="ml-7 p-3 my-3 w-96 rounded-md  outline-0"
                        type="text"
                        placeholder="Informe a pergunta"
                        value={question}
                        onChange={ev => setQuestion(ev.target.value)} />
                    <input
                        className="ml-7 p-3 my-2 w-96 rounded-md  outline-0"
                        type="text"
                        placeholder="Informe a resposta"
                        value={answare}
                        onChange={ev => setAnsware(ev.target.value)} />
                    <button
                        onClick={handleSubmit}
                        className="flex justify-center items-center bg-red-700 w-28 py-2  text-white my-5 rounded-md text-base">
                        {isLoading ? <Spinner /> : !!isEdit ? 'Editar' : 'Cadastrar'}</button>
                </div>
            </div>
            <div className='bg-white px-20'>
                <h2 className='text-red-500 text-2xl font-bold mb-7'>Dúvidas criadas</h2>
                {
                    data?.map(item => <QuestionItem onEdit={handleEdit} onDelete={handleDelete} item={item} />)
                }
            </div>
        </div>
    );
}

export default CreateQuestion;