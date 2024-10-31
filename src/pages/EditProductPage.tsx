import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useActionData, useLoaderData } from 'react-router-dom';
import { ErrMessage } from "../components/messages/ErrMessage";
import { getProductById, updateProduct } from "../services/productService";
import { Product } from '../types';
import { ProductForm } from '../components/ProductForm';

export const loader = async ({params}: LoaderFunctionArgs) => {
  console.log(params);
  const {id} = params;

  const productId = id ? parseInt(id, 10) : null; // Check if id is valid & convert it to a number
  if(!productId){
    throw new Response("Invalid product id", {status: 400});
  }

  const product = await getProductById(productId); // Fetch the product by id
  if(!product){
    throw new Response("Product not found", {status: 404});
  }

  return product;
}

export const action = async ({request, params}: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  let err = '';
  if(Object.values(data).includes('')){
    err = 'All the fields are mandatory';
  }
  if(err.length) return err;

  const productId = params.id ? parseInt(params.id, 10) : null; // Check if id is valid & convert it to a number
  if(!productId){
    throw new Response("Invalid product id", {status: 400});
  }

  await updateProduct(data, productId);

  return redirect('/');
}

const availabilityOptions = [
    { name: 'A', value: true},
    { name: 'NA', value: false}
]

export const EditProductPage = () => {

  const product = useLoaderData() as Product;
  const err = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Edit Product
        </h2>
        <Link
              to="/"
              className="rounded-md bg-indigo-300 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
        >
            Back to Product
        </Link>
      </div>
      {err && <ErrMessage>{err}</ErrMessage>}
      <Form
          className="mt-10"
          method="POST"
      >
      
          <ProductForm product={product} />

          <div className="mb-4">
              <label
                  className="text-gray-800"
                  htmlFor="availability"
              >Availability:</label>
              <select 
                  id="availability"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  name="availability"
                  defaultValue={product?.availability.toString()}
              >
                  {availabilityOptions.map(option => (
                    <option key={option.name} value={option.value.toString()}>{option.name}</option>
                  ))}
              </select>
          </div>
          <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Set Product"
          />
      </Form>
    </>
  )

}
