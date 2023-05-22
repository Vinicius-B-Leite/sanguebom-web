import React from 'react';
import { QuestionType } from '../../pages/createQuestion';
import { GiPencil } from 'react-icons/gi'
import { BsTrash, BsPencil } from 'react-icons/bs'

type Props = {
    item: QuestionType,
    onEdit: (item: QuestionType) => Promise<void>,
    onDelete: (id: string) => Promise<void>
}
const QuestionItem: React.FC<Props> = ({ item, onDelete, onEdit }) => {
    return (
        <div className='flex flex-row justify-between border-t-2 border-black w-full whitespace-normal'>
            <p className='text-black text-xl max-w-md break-words'>{item.questions}</p>
            <p className='text-black text-xl max-w-sm break-words'>{item.answare}</p>
            <div>
                <button onClick={() => onEdit(item)}><BsPencil className="text-2xl mr-4" /></button>
                <button onClick={() => onDelete(item.id)}  ><BsTrash className="text-2xl text-red-600" /></button>
            </div>
        </div>
    )
}

export default QuestionItem;