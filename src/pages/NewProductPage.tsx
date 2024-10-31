import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom"
import { ErrMessage } from "../components/messages/ErrMessage";
import { addProduct } from "../services/productService";
import { ProductForm } from "../components/ProductForm";

export const action = async ({request}: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  let err = '';
  if(Object.values(data).includes('')){
    err = 'All the fields are mandatory';
  }
  if(err.length) return err;

  await addProduct(data);

  return redirect('/');
}

export const NewProduct = () => {

  const err = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Product Register
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
      
          <ProductForm />
          
          <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Set Product"
          />
      </Form>
    </>
  )

}
