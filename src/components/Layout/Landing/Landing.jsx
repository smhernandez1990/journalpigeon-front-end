import { Link } from 'react-router'

const Landing = () => {
    return (
        <>
        <main>
            <img src='someimageurl' alt='screenshot of finished explore page' />
            <br />
            <br />
            <br />
            <h2>Welcome to JournalPigeon</h2>
            <p>
                Did you know that the pigeons you see on the street while you go about your day are likely the same pigeons you see there every day?
                <br />
                <br />
                We like to think you'll see the same flock of JournalPigeons here whenever you sign in here. View the latests posts on our dynamic Explore page, dive into your shared niche interests by using our tags feature and if you find a post you really like you can easily view all of that users posts with a single click.
                <br />
                <br />
                Join the 10's of users on JournalPigeon today!
            </p>
            <Link to={`/sign-up`}>
            <button>Sign Up</button>
            </Link>
            <Link to={`/sign-in`}>
            <button>Sign In</button>
            </Link>
        </main>
        </>
    );
};

export default Landing;