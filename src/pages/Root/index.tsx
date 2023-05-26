import { Link, Outlet } from "react-router-dom";
import Logo from '../../assets/logo sangue bom.svg'
import { useUser } from "../../context/authContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { BsFillQuestionSquareFill } from 'react-icons/bs'
import { FaHospitalUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'

const routes = [
    {
        label: 'Criar questão',
        path: '/',
        icon: <BsFillQuestionSquareFill />
    },
    {
        label: 'Criar ponto de coleta',
        path: 'createbloodcollectors',
        icon: <FaHospitalUser />
    },
]


function Root() {
    const { logout } = useUser()
    const { width } = useWindowDimensions()
    return (
        <div className="flex flex-row">
            {
                width > 639 ?
                    <div className="flex fixed  flex-col bg-red-700 w-60 h-full py-3">
                        <div className="flex justify-center items-center">
                            <img className="w-0 sm:max-2xl:w-28 bg-red-800 rounded-full" src={Logo} alt="" />
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
                    :
                    <div className="flex bg-red-700 fixed  bottom-0 left-0 w-full justify-evenly">
                        {
                            routes.map(r => (
                                <button className="flex justify-center items-center w-16 sm:w-40 bg-red-500 p-3 rounded-md my-3" >
                                    <Link className="text-white font-bold" to={r.path}>{r.icon}</Link>
                                </button>
                            ))
                        }
                        <button className="flex justify-center items-center w-16 sm:w-40  bg-red-500 p-3 rounded-md my-3 text-white font-bold " >
                            <BiLogOut />
                        </button>
                    </div>
            }

 
            <div className=" pb-20  sm:ml-52">
                <Outlet />
            </div>
        </div >
    );
}

export default Root;