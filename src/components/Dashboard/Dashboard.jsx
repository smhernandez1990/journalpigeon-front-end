import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import * as userService from '../../services/userService'

const Dashboard = () => {
    const { user } = useContext(UserContext)
    const [users, setUsers] = useState([])
    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const allUsers = await userService.index()
                console.log(allUsers);
                setUsers(allUsers)
            } catch (error) {
                console.log(error);
                
            }
        }
        fetchUsers()
    }, [])
  return (
    <div>
        <h1>Welcome Back, {user.username}</h1>
        <p>This is a page where you will see a list of users</p>
        {users.map(u => <h2 key={u._id}>{u.username}</h2>)}
    </div>
  )
}

export default Dashboard