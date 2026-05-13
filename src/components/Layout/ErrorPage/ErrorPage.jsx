import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <main className="max-w-md mx-auto px-6 py-20 text-center min-h-[70vh] flex flex-col justify-center">
      <div className="card bg-brand-mutedp text-white shadow-2xl p-10 rounded-3xl border border-white/10">
        <header className="mb-6">
          <h2 className="text-6xl font-black text-brand-lightp mb-4">404</h2>
          <div className="h-1.5 w-16 bg-white/20 rounded-full mx-auto mb-6"></div>
        </header>

        <p className="text-xl leading-relaxed italic mb-8 opacity-90">
          See what happens when you go off on your own? You know what they say,
          <span className="text-brand-lightp font-bold">
            {" "}
            'Birds of a Feather..'
          </span>{" "}
          and so on.
        </p>

        <button
          onClick={() => navigate("/posts")}
          className="btn bg-brand-lightp text-brand-darkp border-none px-8 font-bold hover:bg-white hover:scale-105 transition-all shadow-lg"
        >
          Back to the Flock!
        </button>
      </div>
    </main>
  );
};

export default ErrorPage;
