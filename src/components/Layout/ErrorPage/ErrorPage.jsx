import { useNavigate } from 'react-router'

const ErrorPage = () => {

    const navigate = useNavigate()

    return (
        <div>
            <h2>404 Error</h2>
            <p>
                See what happens when you go off on your own? You know what they say, <em>'Birds of a Feather..'</em> and so on.
            </p>
            <button onClick={() => navigate('/posts')}>Back to the Flock!</button>
        </div>
    )
}

export default ErrorPage