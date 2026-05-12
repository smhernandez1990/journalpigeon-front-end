import { toast } from 'react-toastify'
export const errNotify = (error) => {
    toast.error('Error: ', error)
}