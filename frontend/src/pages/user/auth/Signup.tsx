import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleRegister } from '@/services/auth/authService';
import { toast } from 'sonner';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState<any>({});

  // ----------------------------
  // Update field & clear error
  // ----------------------------
  const updateField = (
    field: string,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [field]: '',
    }));
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.fullName.trim())
      newErrors.fullName =
        'Full Name is required';

    if (!form.email.includes('@'))
      newErrors.email =
        'Invalid email';

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (
      !passwordRegex.test(
        form.password
      )
    )
      newErrors.password =
        'Minimum 6 chars with one letter, one number, and one special char';

    if (
      form.password !==
      form.confirmPassword
    )
      newErrors.confirmPassword =
        'Passwords do not match';

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await handleRegister(form);

      toast.success(
        'Registration Successful'
      );

      navigate('/login');
    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ||
          'Signup failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-poppins flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
        
        {/* Left Side */}
        <div className="hidden md:flex relative items-center justify-center bg-gradient-to-br from-primary to-secondary p-12">
          <div className="text-center text-white z-10">
            <h2 className="text-4xl font-bold mb-5 leading-tight">
              Join Trip Pilot AI
            </h2>

            <p className="text-white/90 leading-relaxed text-base max-w-md mx-auto">
              Discover amazing
              destinations, create
              smart itineraries, and
              plan unforgettable
              journeys with AI.
            </p>
          </div>

          {/* Decorative Blur */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 md:p-12 bg-card">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md"
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Create Account
              </h2>

              <p className="text-muted-foreground mt-2">
                Start your journey
                with Trip Pilot AI
              </p>
            </div>

            {/* FULL NAME */}
            <InputField
              label="Full Name"
              field="fullName"
              value={form.fullName}
              error={
                errors.fullName
              }
              onChange={
                updateField
              }
            />

            {/* EMAIL */}
            <InputField
              label="Email"
              field="email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={
                updateField
              }
            />

            {/* PASSWORD */}
            <InputField
              label="Password"
              field="password"
              type="password"
              value={
                form.password
              }
              error={
                errors.password
              }
              onChange={
                updateField
              }
            />

            {/* CONFIRM PASSWORD */}
            <InputField
              label="Confirm Password"
              field="confirmPassword"
              type="password"
              value={
                form.confirmPassword
              }
              error={
                errors.confirmPassword
              }
              onChange={
                updateField
              }
            />

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary hover:bg-secondary text-white font-medium py-3 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}

              {loading
                ? 'Processing...'
                : 'Sign Up'}
            </button>

            {/* LOGIN */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an
              account?{' '}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// ----------------------------
// Reusable Input Component
// ----------------------------
const InputField = ({
  label,
  field,
  value,
  onChange,
  error,
  type = 'text',
}: any) => (
  <div className="mb-5">
    <label className="block text-sm font-medium text-foreground mb-2">
      {label}
    </label>

    <input
      type={type}
      value={value}
      onChange={(e) =>
        onChange(
          field,
          e.target.value
        )
      }
      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/20"
    />

    {error && (
      <p className="text-danger text-sm mt-1">
        {error}
      </p>
    )}
  </div>
);

export default Signup;