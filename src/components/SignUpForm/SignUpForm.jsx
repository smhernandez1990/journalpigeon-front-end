import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signUp } from '../../services/authService'
import { UserContext } from '../../contexts/UserContext'

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    })

    const navigate = useNavigate()
    
    const [message, setMessage] = useState('')

    const { setUser } = useContext(UserContext)

    const { username, password, passwordConf } = formData
    

    const handleChange = (e) => {
        setMessage('')
        setFormData({ ...formData, [e.target.name] : e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()// stops browser from refreshing on form submit
        console.log(formData);
        try {
            const user = await signUp(formData)
            setUser(user)
        } catch (error) {
            console.log(error);
            setMessage(error.message)
            throw new Error(error.message)
        }
    }

    const isFormValid = () => {
        return !(username && password && password === passwordConf)
    }

    return (
        <main>
            <h1>Sign Up</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        type='text'
                        id='name'
                        value={username}
                        name='username'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        name='password'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='confirm'>Confirm Password:</label>
                    <input
                        type='password'
                        id='confirm'
                        value={passwordConf}
                        name='passwordConf'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button disabled={isFormValid()}>Sign Up</button>
                    <button onClick={() => navigate('/')}>Cancel</button>
                </div>
            </form>
        </main>
  )
}

export default SignUpForm