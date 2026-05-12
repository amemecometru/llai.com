import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Tiles from './routes/Tiles';
import InboxTriage from './routes/InboxTriage';
import Docs from './routes/Docs';
import Terms from './routes/Terms';
import Privacy from './routes/Privacy';
import Refund from './routes/Refund';
import Contact from './routes/Contact';
import Security from './routes/Security';
import Dashboard from './routes/Dashboard';
import Subscribe from './routes/Subscribe';

/**
 * Simple auth guard — placeholder until Better Auth OAuth is configured.
 * Replace with actual Better Auth session check once credentials are set up.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // TODO: Replace with Better Auth session check:
  // const { data: session } = useSession();
  // if (!session) return <Navigate to="/" replace />;
  // For now, render children directly (dev mode).
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Tiles />} />
        <Route path="tiles" element={<Tiles />} />
        <Route path="triage" element={<InboxTriage />} />
        <Route path="docs" element={<Docs />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="refund" element={<Refund />} />
        <Route path="contact" element={<Contact />} />
        <Route path="security" element={<Security />} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="subscribe" element={<ProtectedRoute><Subscribe /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
