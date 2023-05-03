
type Props = {
    type?: 'text' | 'password' | 'email',
    value: string,
    setValue: (txt: string) => void,
    placeholder?: string,
    leftIcon?: JSX.Element
}

function Input({ type = 'text', setValue, value, placeholder, leftIcon }: Props) {
    return (
        <div className="flex flex-row bg-red-100 p-3 rounded-md w-full mx-3 items-center">
            {leftIcon}
            <input
                className=" outline-0 bg-transparent"
                type={type}
                value={value}
                onChange={(ev) => setValue(ev.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}

export default Input;