import { Link, useNavigate } from "react-router-dom";
import { UserRound, Building2 } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleIndividualClick = () => {
    navigate("/register/individual");
  };

  return (
    <div className="bg-[#f6f7f8] text-gray-800">
      <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Join ImpactConnect
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              How would you like to register?
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleIndividualClick}
                className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1193d4]"
              >
                <UserRound
                  className="h-12 w-12 mb-4 text-[#1193d4]"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg font-bold text-gray-900">Individual</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Join as a volunteer or donor.
                </p>
              </button>
              <Link
                to="/register/ngo"
                className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1193d4]"
              >
                <Building2
                  className="h-12 w-12 mb-4 text-[#1193d4]"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg font-bold text-gray-900">NGO</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Register your organization.
                </p>
              </Link>
            </div>
            <p className="text-center text-sm mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#1193d4] hover:text-opacity-80"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
