/**
 * POST /api/create-checkout — Stripe Checkout for pay-per-result tile runs.
 * Accepts: { tile_slug, user_email, user_name? }
 * Returns:  { url }  (Stripe-hosted checkout page)
 */
export async function onRequestPost(context: any) {
  const { tile_slug, user_email, user_name } = await context.request.json();

  if (!tile_slug || !user_email) {
    return Response.json({ error: 'Missing tile_slug or user_email' }, { status: 400 });
  }

  const stripeKey = context.env.STRIPE_SECRET_KEY;
  const baseOrigin = context.request.headers.get('origin') || 'https://www.logiclemonai.com';

  // 1. Create or get Stripe customer
  let customerId: string;
  const customerRes = await fetch(
    `https://api.stripe.com/v1/customers?email=${encodeURIComponent(user_email)}`,
    { headers: { Authorization: `Bearer ${stripeKey}` } },
  );
  const customers = await customerRes.json();

  if (customers.data && customers.data.length > 0) {
    customerId = customers.data[0].id;
  } else {
    const newCustomer = await fetch('https://api.stripe.com/v1/customers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email: user_email,
        name: user_name || user_email.split('@')[0],
      }),
    });
    const customer = await newCustomer.json();
    customerId = customer.id;
  }

  // 2. Build a one-time payment checkout (payment mode, not subscription)
  //    Uses line-item amount directly so we don't need pre-created Prices.
  //    Price mapping is kept in-code for safety.
  const pricesCents: Record<string, number> = {
    'inbox-triage':       499,
    'standup-concierge':  299,
    'pr-review-brief':    199,
    'calendar-choreographer': 599,
    'knowledge-tender':   799,
    'revenue-pulse':      399,
    'lead-warmer':        999,
  };

  const amount = pricesCents[tile_slug];
  if (!amount) {
    return Response.json({ error: `Unknown tile: ${tile_slug}`, available: Object.keys(pricesCents) }, { status: 400 });
  }

  const sessionRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      customer: customerId,
      mode: 'payment',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][unit_amount]': String(amount),
      'line_items[0][price_data][product_data][name]': `LogicLemon: ${tile_slug} (one-time)`,
      'line_items[0][price_data][product_data][description]': `Pay-per-result workflow run — you only pay when the tile delivers.`,
      'line_items[0][quantity]': '1',
      success_url: `${baseOrigin}/dashboard?checkout=success&tile=${tile_slug}`,
      cancel_url: `${baseOrigin}/tiles?checkout=cancelled`,
      metadata[tile_slug]: 'true',  // pass through for webhook handler
    }),
  });

  const session = await sessionRes.json();
  if (session.error) {
    return Response.json({ error: session.error.message || 'Stripe checkout failed' }, { status: 500 });
  }
  return Response.json({ url: session.url });
}
