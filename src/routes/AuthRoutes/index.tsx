import { Routes, Route } from 'react-router-dom';
import { Login } from '../../pages/Auth/Login';
import { SignUp } from '../../pages/Auth/SignUp';

export function AuthRoutes() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
