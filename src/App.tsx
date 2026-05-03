import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Tiles from './routes/Tiles';
import Docs from './routes/Docs';
import Terms from './routes/Terms';
import Privacy from './routes/Privacy';
import Refund from './routes/Refund';
import Contact from './routes/Contact';
import Security from './routes/Security';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Tiles />} />
        <Route path="tiles" element={<Tiles />} />
        <Route path="docs" element={<Docs />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="refund" element={<Refund />} />
        <Route path="contact" element={<Contact />} />
        <Route path="security" element={<Security />} />
      </Route>
    </Routes>
  );
}
