import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/slices/userAuthSlice';
import type { AppDispatch, RootState } from '@/redux/store';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.userAuth
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setLocalError('Email and password are required');
      return;
    }

    setLocalError('');

    try {
      await dispatch(
        loginUser({
          email: trimmedEmail,
          password: trimmedPassword,
        })
      ).unwrap();

      toast.success('Login successful');
    } catch (err: any) {
      console.error(
        'Login error (handled in Redux):',
        err
      );
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background font-poppins flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-card border border-border rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
        
        {/* Left Side */}
        <div className="hidden md:flex relative items-center justify-center bg-gradient-to-br from-primary to-secondary p-12">
          <div className="text-center text-white z-10">
            <h2 className="text-4xl font-bold mb-5 leading-tight">
              Welcome Back to
              <br />
              Trip Pilot AI
            </h2>

            <p className="text-white/90 leading-relaxed text-base max-w-md mx-auto">
              Discover unforgettable journeys, explore breathtaking destinations,
              and turn your travel dreams into reality. Your next adventure
              starts here!
            </p>
          </div>

          {/* Decorative Blur */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 md:p-12 bg-card">
          <form
            className="w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-foreground">
                Login
              </h2>

              <p className="text-muted-foreground mt-2">
                Welcome back! Please enter your details.
              </p>
            </div>

            {(localError || error) && (
              <div className="mb-5 rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-sm text-danger text-center">
                  {localError || error}
                </p>
              </div>
            )}

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>

              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/20"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary hover:bg-secondary text-white font-medium py-3 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading
                ? 'Logging in...'
                : 'Login'}
            </button>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don’t have an account?{' '}
              <Link
                to="/signup"
                className="text-primary font-medium hover:underline"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '@/redux/slices/userAuthSlice';
// import type { AppDispatch, RootState } from '@/redux/store';
// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();

//   const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.userAuth);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [localError, setLocalError] = useState('');

//   useEffect(() => {
//     if (isAuthenticated) {
//       //   console.log(isAuthenticated,'isAuth')

//       navigate('/home');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleSubmit = async () => {
//     const trimmedEmail = email.trim();
//     const trimmedPassword = password.trim();

//     if (!trimmedEmail || !trimmedPassword) {
//       setLocalError('Email and password are required');
//       return;
//     }

//     setLocalError('');

//     try {
//       await dispatch(loginUser({ email: trimmedEmail, password: trimmedPassword })).unwrap();
//       toast.success('Login successful');
//     } catch (err: any) {
//       console.error('Login error (handled in Redux):', err);
//       toast.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center font-poppins bg-background px-4">
//       <div className="flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden bg-white">
//         {/* Left Side */}
//         <div className="hidden md:flex md:w-1/2 bg-orange items-center justify-center p-8">
//           <div className="text-center text-white">
//             <h2 className="text-3xl font-bold mb-4">Welcome Back to Trip Pilot Ai</h2>
//             <p className="text-base leading-relaxed">
//               Discover unforgettable journeys, explore breathtaking destinations, and turn your
//               travel dreams into reality. Your next adventure starts here!
//             </p>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="w-full md:w-1/2 flex items-center justify-center p-8">
//           <form
//             className="w-full max-w-md"
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleSubmit();
//             }}
//           >
//             <h2 className="text-2xl font-bold text-orange mb-6 text-center">
//               Login to Trip Pilot Ai
//             </h2>

//             {(localError || error) && (
//               <p className="text-sm text-red-500 mb-4 text-center">{localError || error}</p>
//             )}

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-foreground mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 autoComplete="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full border border-border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-foreground mb-1">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 autoComplete="current-password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full border border-border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange"
//                 placeholder="Enter your password"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-orange text-white py-2 rounded hover:bg-orange-dark transition"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>

//             <p className="mt-4 text-sm text-center text-muted-foreground">
//               Don’t have an account?{' '}
//               <Link to="/signup" className="text-orange hover:underline">
//                 Signup
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
