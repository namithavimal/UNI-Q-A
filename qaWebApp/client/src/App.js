import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile"
import Navbar  from "./components/navbar/navbar";
import Leftbar from "./components/leftbar/leftbar";
import { SearchProvider } from './context/searchContext';
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";


function App() {

  
  const {currentUser} = useContext(AuthContext);
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
       <SearchProvider>
        <div>
          <Navbar />
            <div style={{ display: "flex" }}>
              <Leftbar />
                  <div style={{ flex: 6 }}>
                <Outlet />
            </div>
          </div>
        </div>
      </SearchProvider>
      </QueryClientProvider>
    )
  }

  // checking whether userloggedin
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/Login" />;
    }
    return children;
  };

 const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Profile/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
]);

  return (   
      <div>
       <RouterProvider router={router} />
      </div>  
  );
}

export default App;
