import React from 'react'


type Props = {
    children: React.ReactNode,
    onClick: () => void
}

function Button({ children, onClick }: Props) {
    return (
        <button onClick={onClick} className='flex justify-center items-center w-full bg-red-700 py-2 text-xl  text-white font-bold rounded-md'>{children}</button>
    );
}

export default Button;