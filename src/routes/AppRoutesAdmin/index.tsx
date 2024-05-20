import { Routes, Route } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';
import { NewDish } from '../../pages/NewDish';
import { Favorites } from '../../pages/Favorites';
import { EditDish } from '../../pages/EditDish';
import { Calendar } from '@/pages/Calendar';
import { Users } from '@/pages/Users';
import { RegisterUser } from '@/pages/RegisterUser';
import { Settings } from '@/pages/Settings';

import { NoMatch } from '@/pages/NoMatch';

export function AppRoutesAdmin() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/new-dish" element={<NewDish />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/edit-dish/:id" element={<EditDish />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/users" element={<Users />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/settings" element={<Settings />} />

      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
