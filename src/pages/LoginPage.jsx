import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f7f8] flex items-center justify-center">
      <div className="flex items-center justify-center min-h-screen bg-[#f6f7f8]">
        <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="mt-2 text-sm text-gray-600">
              Log in to connect and make a difference.
            </p>
          </div>
          <form className="mt-4 flex flex-col gap-2">
            <div className="space-y-4">
              <input
                id="email-username"
                name="email-username"
                type="text"
                required
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-t-md focus:outline-none focus:ring-[#1193d4] focus:border-[#1193d4] focus:z-10 sm:text-sm"
                placeholder="Email or username"
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-t-0 border-gray-300 rounded-b-md focus:outline-none focus:ring-[#1193d4] focus:border-[#1193d4] focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                onClick={() => navigate("/home")}
                className="w-full px-4 py-3 font-medium text-white bg-[#1193d4] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1193d4] transition duration-150 ease-in-out"
              >
                Log in
              </button>
            </div>

            <p className="mt-2 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-[#1193d4] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
