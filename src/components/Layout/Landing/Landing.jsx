import { Link } from "react-router";

const Landing = () => {
<<<<<<< HEAD:src/components/Layout/Landing/Landing.jsx
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
=======
  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col items-center text-center min-h-screen">
      <div className="card bg-base-100 shadow-xl overflow-hidden border border-border mb-8">
        <figure>
          <img
            src="someimageurl"
            alt="JournalPigeon Explore Page"
            className="w-full h-auto"
          />
        </figure>
      </div>

      <h2 className="text-4xl font-bold text-brand-darkp mb-6 font-heading">
        Welcome to JournalPigeon
      </h2>

      <div className="space-y-4 text-lg text-text max-w-2xl mb-10 leading-relaxed">
        <p>
          Did you know that the pigeons you see on the street while you go about
          your day are likely the same pigeons you see there every day?
        </p>
        <p>
          We like to think you'll see the same flock of JournalPigeons here
          whenever you sign in. View the latest posts on our dynamic Explore
          page, dive into your shared niche interests using our tags feature,
          and view all of a user's posts with a single click.
        </p>
        <p className="font-semibold text-brand-primaryp">
          Join the 10's of users on JournalPigeon today!
        </p>
      </div>

      <div className="flex gap-4">
        <Link to="/sign-up">
          <button className="btn btn-primary px-8">Sign Up</button>
        </Link>
        <Link to="/sign-in">
          <button className="btn btn-outline btn-primary px-8">Sign In</button>
        </Link>
      </div>
    </main>
  );
>>>>>>> ed6ba5f968eb09b77270fac97348bc61843209af:src/components/Landing/Landing.jsx
};

export default Landing;
