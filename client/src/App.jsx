
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from "./Context/AuthContext";
import { FollowContextProvider } from "./Context/FollowContext";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Loginpage from "./Pages/Loginpage";
import Upload from "./Pages/Upload";
import "./style.scss"
import '@fortawesome/fontawesome-free/css/all.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/Login",
    element: <Loginpage></Loginpage>,
  },
  {
    path: "/Register",
    element: <Register></Register>,
  },
  {
    path: "/Upload",
    element: <Upload></Upload>,
  },
]);
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <FollowContextProvider>
    
      <div className="app">
        <div className="container">
        <RouterProvider router={router} />
        </div>
      </div>
      </FollowContextProvider>
   </AuthContextProvider>
   </QueryClientProvider>
    
  )
}

export default App
