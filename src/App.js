import "./App.css";
import Home from "./components/Home/Home.jsx";
import Products from "./components/Products/Products.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Categories from "./components/Categories/Categories.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Brand from "./components/Brand/Brand.jsx";
import Address from "./components/Address/Address.jsx";
import Notfound from "./components/Notfound/Notfound.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import UserOrder from "./components/UserOrder/UserOrder.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "./components/Context/CartContext.js";
import UserContextProvider from "./components/Context/UserContext.js";
import OrderContextProvider from "./components/Context/OrderContext.js";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "userOrder",
        element: (
          <ProtectedRoute>
            <UserOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "productDetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },

      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "address",
        element: (
          <ProtectedRoute>
            <Address />
          </ProtectedRoute>
        ),
      },

      {
        path: "brand",
        element: (
          <ProtectedRoute>
            <Brand />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

let queryClient = new QueryClient();

function App() {
  return (
    <CartContextProvider>
      <OrderContextProvider>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <RouterProvider router={routers}></RouterProvider>;
          </UserContextProvider>
          <Toaster />
        </QueryClientProvider>
      </OrderContextProvider>
    </CartContextProvider>
  );
}

export default App;
