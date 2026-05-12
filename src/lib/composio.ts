import { Composio } from '@composio/core';

export const composio = new Composio({
  apiKey: import.meta.env.VITE_COMPOSIO_API_KEY,
});

export async function getConnectUrl(userId: string, toolkit: string, authConfigId?: string) {
  const connection = await composio.connectedAccounts.link(userId, authConfigId || toolkit, {
    callbackUrl: `${window.location.origin}/api/composio/callback`,
  });
  return connection.redirectUrl;
}

export async function getConnectedAccounts(userId: string) {
  const accounts = await composio.connectedAccounts.list(userId);
  return accounts;
}
