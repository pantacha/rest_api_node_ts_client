import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from 'react-router-dom'

import { deleteProduct } from '../services/productService'
import { formatCurrency } from '../utils'

type Props = {
    id: number,
    name: string,
    price: number,
    availability: boolean
}

export const action = async ({params}: ActionFunctionArgs) => {

  const productId = params.id ? parseInt(params.id, 10) : null; // Check if id is valid & convert it to a number
  if(!productId){
    throw new Response("Invalid product id", {status: 400});
  }

  await deleteProduct(productId);

  return redirect('/');
}

export const ProductsDetails = ({name, availability, price, id}: Props) => {

  const navigate = useNavigate();

  const fetcher = useFetcher();

  return (
            <tr className="border-b ">
                <td className="p-3 text-lg text-gray-800">
                    {name}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    {formatCurrency(price)}
                </td>
                <td className="p-3 text-lg text-gray-800">
                    <fetcher.Form method='POST'>
                        <button
                            type='button'
                            name='id'
                            value={id}
                            className={`${availability ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs
                                            uppercase font-bold w-full border border-black hover:cursor-pointer`}
                        >
                            {availability ? 'A' : 'NA'}
                        </button>
                    </fetcher.Form>
                </td>
                <td className="p-3 text-lg text-gray-800 ">
                    <div className="flex gap-2 items-center">
                        {/* <Link
                            to={`products/${id}/edit`}
                            className="bg-indigo-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs
                                            text-center">Edit</Link> */}
                        <button onClick={() => navigate(`products/${id}/edit`)}
                                className="bg-indigo-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs
                                            text-center">Edit</button>
                        <Form
                            className="w-full"
                            method="POST"
                            action={`products/${id}/delete`} // Las actions también se pueden disparar desde components
                            onSubmit={(event) => {
                                if(!confirm('Delete?')){
                                    event.preventDefault();
                                }
                            }}
                        >
                            <input
                                type="submit"
                                className="w-full bg-red-600 p-2 text-white font-bold
                                            text-xs cursor-pointer rounded-lg"
                                value="Delete"
                            />
                        </Form>
                    </div>
                </td>
            </tr>
  )

}
