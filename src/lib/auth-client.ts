import { useState, useEffect } from 'react';

/**
 * Auth client stub — placeholder until Better Auth / OAuth is configured.
 * Provides the same API surface (useSession, signIn, signOut) so the app builds.
 */

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

interface Session {
  user: User | null;
  data: { user: User } | null;
}

const sessionStore: { current: Session } = {
  current: { user: null, data: null },
};

export function useSession(): Session {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    // In production, this would subscribe to the real auth provider.
    return () => {};
  }, []);

  return sessionStore.current;
}

export function signIn(_options?: {
  email?: string;
  password?: string;
  callbackURL?: string;
}): Promise<void> {
  console.warn('signIn not configured — stub mode');
  return Promise.resolve();
}

export function signOut(): Promise<void> {
  console.warn('signOut not configured — stub mode');
  return Promise.resolve();
}

export const authClient = {
  useSession,
  signIn,
  signOut,
};
