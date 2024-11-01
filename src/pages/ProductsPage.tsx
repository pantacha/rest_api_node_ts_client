import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProductData, getProducts, updateProductAvailability } from "../services/productService";
import { ProductsDetails } from "../components/ProductsDetails";

export const loader = async () => {
  console.log('...');
  const products = await getProducts();
  console.log({products});
  return products || [];
}

export const action = async ({request}: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  const productId = data.id ? parseInt(data.id as string, 10) : null; // Check if id is valid & convert it to a number
  if(!productId){
    throw new Response("Invalid product id", {status: 400});
  }

  await updateProductAvailability(productId);

  return {};
}

export const Products = () => {

  const products = useLoaderData() as getProductData[];

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Products
        </h2>
        <Link 
              to="products/new"
              className="rounded-md bg-indigo-300 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
            Add Product
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
              <tr>
                  <th className="p-2">Product</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Availability</th>
                  <th className="p-2">Actions</th>
              </tr>
          </thead>
          <tbody>
            {products.map(({id, availability, name, price}) => (
              <ProductsDetails key={id} name={name} price={price} availability={availability} id={id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
  
}
