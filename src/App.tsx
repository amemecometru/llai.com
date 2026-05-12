import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Tiles from './routes/Tiles';
import InboxTriage from './routes/InboxTriage';
import StandupConcierge from './routes/StandupConcierge';
import PRReviewBrief from './routes/PRReviewBrief';
import CalendarChoreographer from './routes/CalendarChoreographer';
import KnowledgeTender from './routes/KnowledgeTender';
import RevenuePulse from './routes/RevenuePulse';
import LeadWarmer from './routes/LeadWarmer';
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
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Tiles />} />
        <Route path="tiles" element={<Tiles />} />
        {/* Workflow pages — each gets a full dedicated UX */}
        <Route path="triage" element={<InboxTriage />} />
        <Route path="standup" element={<StandupConcierge />} />
        <Route path="pr-review" element={<PRReviewBrief />} />
        <Route path="calendar" element={<CalendarChoreographer />} />
        <Route path="knowledge" element={<KnowledgeTender />} />
        <Route path="revenue" element={<RevenuePulse />} />
        <Route path="leads" element={<LeadWarmer />} />
        {/* Legacy pages */}
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
