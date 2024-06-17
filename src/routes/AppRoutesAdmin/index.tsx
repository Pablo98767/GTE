import { Routes, Route } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';
import { Favorites } from '../../pages/Favorites';
import { Calendar } from '@/pages/Calendar';
import { RegisterUser } from '@/pages/RegisterUser';
import { Settings } from '@/pages/Settings';

import { NoMatch } from '@/pages/NoMatch';

export function AppRoutesAdmin() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/register-user" element={<RegisterUser />} />
      <Route path="/settings" element={<Settings />} />
<<<<<<< HEAD
     

=======
>>>>>>> cb6d32702cd98ee579278406dc627b5245a7114d
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
