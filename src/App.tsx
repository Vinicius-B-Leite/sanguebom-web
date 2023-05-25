import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { useUser } from "./context/authContext";
import Login from "./pages/Login";
import CreateQuestion from "./pages/createQuestion";
import Root from "./pages/Root";
import CreateBloodCollectors from "./pages/CreateBloodCollectors";


const loginRoute = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);


const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <CreateQuestion />,
      },
      {
        path: 'createbloodcollectors',
        element: <CreateBloodCollectors />
      },
    ]
  },
]);



function App() {
  const { user } = useUser()

  return (
    <RouterProvider router={user ? appRoute : loginRoute} />
  );
}

export default App;