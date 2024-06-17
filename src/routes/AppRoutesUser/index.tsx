import { Routes, Route } from 'react-router-dom';

import { Home } from '@/pages/Home';
import { Favorites } from '@/pages/Favorites';
import { Profile } from '@/pages/Profile';
import { Calendar } from '@/pages/Calendar';
import { Settings } from '@/pages/Settings';
import { NoMatch } from '@/pages/NoMatch';


export function AppRoutesUser() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/settings" element={<Settings />} />
    
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
