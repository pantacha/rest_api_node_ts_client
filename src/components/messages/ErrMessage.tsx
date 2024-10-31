import { ReactNode } from 'react'

type Props = {
    children: ReactNode;
}

export const ErrMessage = ({children}: Props) => {

  return (
    <div className="bg-red-100 border border-red-400 text-red-600 px-4 py-3
                         h-20 rounded relative flex items-center justify-center"
                          role="alert">
        <span className="block sm:inline">{children}</span>
    </div>
  )

}