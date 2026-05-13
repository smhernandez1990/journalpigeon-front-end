import { Link } from "react-router";

const Landing = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col items-center text-center min-h-screen">
      <div className="card bg-base-100 shadow-xl overflow-hidden border border-border mb-8 w-full h-100">
        <figure className="w-full h-full">
          <img
            src="https://i.imgur.com/8VvGD3m.png"
            alt="JournalPigeon Explore Page"
            className="w-full h-full object-cover object-top"
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
};

export default Landing;
