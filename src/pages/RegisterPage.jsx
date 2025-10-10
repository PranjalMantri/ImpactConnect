import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Heart } from "lucide-react";

// 1. Define the validation schema using Zod
const registerSchema = z
  .object({
    role: z.enum(["donor", "volunteer", "ngo"], {
      required_error: "Please select a role.",
    }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("donor");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "donor",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setValue("role", newRole, { shouldValidate: true });
  };

  // 2. Handle form submission logic
  const onSubmit = async (data) => {
    console.log("Registration data:", data);

    try {
      // Simulate an API call delay and successful registration
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On successful registration, navigate to the home page or a success page
      navigate("/");
    } catch (error) {
      // Handle registration error (e.g., display a global error message)
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
              <Heart
                className="w-7 h-7 text-primary-foreground"
                fill="currentColor"
              />
            </div>
            <span className="text-2xl font-bold">ImpactConnect</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-muted-foreground">Join us to make a difference</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          {/* 3. Attach handleSubmit and onSubmit to the form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Role Selection */}
            <div>
              <Label className="mb-3 block">I am a</Label>
              <div className="space-y-2">
                {["donor", "volunteer", "ngo"].map((option) => (
                  <div
                    key={option}
                    onClick={() => handleRoleChange(option)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition 
                      ${
                        role === option
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted"
                      }`}
                  >
                    <input
                      type="radio"
                      id={option}
                      name="role"
                      checked={role === option}
                      onChange={() => handleRoleChange(option)}
                      className="hidden"
                      // No need for explicit register for this hidden input,
                      // as state is managed and setValue updates RHF state.
                    />
                    <Label
                      htmlFor={option}
                      className="cursor-pointer flex-1 capitalize"
                    >
                      {option === "ngo" ? "NGO / Organization" : option}
                    </Label>
                  </div>
                ))}
              </div>
              {/* Display role error if one exists */}
              {errors.role && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Names */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                {/* 4. Register the input and display validation error */}
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-sm font-medium text-destructive mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-sm font-medium text-destructive mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm font-medium text-destructive mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* 5. Disable the button during submission */}
            <Button
              className="w-full"
              size="lg"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
