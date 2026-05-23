import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import {
  Menu,
  User,
  X,
  Plane,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/redux/slices/userAuthSlice';
import type {
  AppDispatch,
  RootState,
} from '@/redux/store';
import { toast } from 'sonner';

const Navbar = () => {
  const dispatch =
    useDispatch<AppDispatch>();

  const {
    isAuthenticated,
    accessToken,
    user,
  } = useSelector(
    (state: RootState) =>
      state.userAuth
  );

  const [
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  ] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      dispatch(logoutUser());
    }
  }, [accessToken]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
            <Plane size={20} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Trip Pilot AI
            </h1>

            <p className="text-xs text-slate-500">
              Smart Travel Planner
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-medium text-slate-700 transition hover:text-primary"
          >
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/upload"
                className="font-medium text-slate-700 transition hover:text-primary"
              >
                Upload
              </Link>

              <Link
                to="/itineraries"
                className="font-medium text-slate-700 transition hover:text-primary"
              >
                My Trips
              </Link>
            </>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="group relative hidden sm:flex">
              <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50">
                <User className="h-5 w-5 text-primary" />

                <span className="font-medium text-slate-700">
                  {user?.fullName}
                </span>
              </div>

              {/* Dropdown */}
              <div className="invisible absolute right-0 top-full mt-3 w-48 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                <button
                  onClick={() => {
                    dispatch(
                      logoutUser()
                    );

                    toast.success(
                      'Logged out'
                    );
                  }}
                  className="w-full rounded-xl px-4 py-3 text-left text-red-500 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden gap-3 sm:flex">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="rounded-xl bg-primary text-white hover:bg-sky-700">
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() =>
              setIsMobileMenuOpen(
                !isMobileMenuOpen
              )
            }
          >
            {isMobileMenuOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <div className="space-y-4">
            <Link
              to="/"
              className="block text-slate-700 hover:text-primary"
              onClick={() =>
                setIsMobileMenuOpen(
                  false
                )
              }
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/upload"
                  className="block text-slate-700 hover:text-primary"
                  onClick={() =>
                    setIsMobileMenuOpen(
                      false
                    )
                  }
                >
                  Upload
                </Link>

                <Link
                  to="/history"
                  className="block text-slate-700 hover:text-primary"
                  onClick={() =>
                    setIsMobileMenuOpen(
                      false
                    )
                  }
                >
                  My Trips
                </Link>

                <button
                  onClick={() => {
                    dispatch(
                      logoutUser()
                    );

                    toast.success(
                      'Logged out'
                    );

                    setIsMobileMenuOpen(
                      false
                    );
                  }}
                  className="font-medium text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-slate-700"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="block font-medium text-primary"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;