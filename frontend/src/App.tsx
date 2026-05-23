import { Routes, Route } from 'react-router-dom';
import UserRoutes from './router/user/UserRoutes';
import { Toaster } from 'sonner';

function App() {
  return (
    <>

      <Routes>

        <Route path="/*" element={<UserRoutes />} />
      </Routes>
      <Toaster richColors />
    </>
  );
}

export default App;
