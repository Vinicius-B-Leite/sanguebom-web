import { Link, Outlet } from "react-router-dom";
import Logo from '../../assets/logo sangue bom.svg'
import { useUser } from "../../context/authContext";


const routes = [
    {
        label: 'Criar questão',
        path: 'createquestions'
    },
    {
        label: 'Criar ponto de coleta',
        path: 'createbloodcollectors'
    },
]


function Root() {
    const { logout } = useUser()
    return (
        <div className="flex flex-row">
            <div className="flex fixed flex-col bg-red-700 w-60 h-screen py-3">
                <div className="flex justify-center items-center">
                    <img className="w-28 bg-red-800 rounded-full" src={Logo} alt="" />
                </div>
                <div className="flex flex-col  h-full p-5">
                    {
                        routes.map(r => (
                            <button className="flex justify-center items-center w-full bg-red-500 p-3 rounded-md my-3" >
                                <Link className="text-white font-bold" to={r.path}>{r.label}</Link>
                            </button>
                        ))
                    }

                    <button
                        className="justify-self-start w-full bg-red-800 p-3 rounded-md my-3 text-white"
                        onClick={logout}>
                        Sair da conta
                    </button>
                </div>
            </div>

            <div className="ml-52">
                <Outlet />
            </div>
        </div>
    );
}

export default Root;