import { toast } from 'react-toastify'
export const errNotify = (error) => {
    toast.err('Error: ', error.message)
}