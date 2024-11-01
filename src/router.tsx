import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Products, loader as productLoader, action as updateAvailabilityAction } from "./pages/ProductsPage";
import { action as newProductAction, NewProduct } from "./pages/NewProductPage";
import { loader as editProductLoader, EditProductPage, action as editProductAction } from "./pages/EditProductPage";
import { action as deleteProductAction } from "./components/ProductsDetails";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        loader: async () => null,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productLoader,
                action: updateAvailabilityAction,
            },
            {
                path: 'products/new',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'products/:id/edit', // (ROA) resources-oriented, design pattern
                element: <EditProductPage />,
                loader: editProductLoader,
                action: editProductAction,
            },
            {
                path: 'products/:id/delete', // (ROA) resources-oriented, design pattern
                action: deleteProductAction,
            }
        ]
    }
])