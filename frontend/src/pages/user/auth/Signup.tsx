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

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // ----------------------------
  // Update field & clear error
  // ----------------------------
  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // clear error automatically
    setErrors((prev: any) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full Name  is required';
 
 
    if (!form.email.includes('@')) newErrors.email = 'Invalid email';

 
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (!passwordRegex.test(form.password))
      newErrors.password = 'Minimum 6 chars with one letter, one number, and one special char';

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    // ----------- Preference validation -----------
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await handleRegister(form);
      toast.success('Registration Successful');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="hidden md:flex md:w-1/2 bg-orange items-center justify-center p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join Trip Pilot Ai</h2>
            <p>Discover content, follow interests, and personalize your feed.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8">
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-orange mb-6 text-center">Create an Account</h2>

            {/* FIRST NAME */}
            <InputField
              label="Full Name"
              field="fullName"
              value={form.fullName}
              error={errors.fullName}
              onChange={updateField}
            />

            

             

            {/* EMAIL */}
            <InputField
              label="Email"
              field="email"
              name="email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={updateField}
            />

             

            {/* PASSWORD */}
            <InputField
              label="Password"
              field="password"
              type="password"
              value={form.password}
              error={errors.password}
              onChange={updateField}
            />

            {/* CONFIRM PASSWORD */}
            <InputField
              label="Confirm Password"
              field="confirmPassword"
              type="password"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              onChange={updateField}
            />

            

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-orange text-white py-2 rounded hover:bg-orange-dark transition flex justify-center items-center gap-2 disabled:opacity-60"
              disabled={loading}
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? 'Processing...' : 'Sign Up'}
            </button>

            <p className="mt-4 text-sm text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-orange underline">
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
const InputField = ({ label, field, value, onChange, error, type = 'text' }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      className="w-full border px-4 py-2 rounded"
      value={value}
      onChange={(e) => onChange(field, e.target.value)}
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

export default Signup;
