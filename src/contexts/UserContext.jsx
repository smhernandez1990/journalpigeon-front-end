import { createContext } from 'react'
import { useState } from 'react'

//set up global state
//components tap into this context through this variable

const UserContext = createContext()

const getUserFromToken = () => {
    const token = localStorage.getItem('token')
    if(!token) return null
    return JSON.parse(atob(token.split('.')[1])).user
}

//make the provider
const UserProvider = ({ children }) => {

    //we define global User state here
    const [user, setUser] = useState(getUserFromToken())

    const value = {
        user,
        setUser
    }

    return ( <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
    )
} 

export{ UserProvider, UserContext }