import { Outlet } from 'react-router-dom';
import Navbar from '@/components/user/Navbar';

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background font-poppins text-foreground">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
