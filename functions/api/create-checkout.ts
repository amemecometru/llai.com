export async function onRequestPost(context: any) {
  const { price_id, email, name } = await context.request.json();
  const stripeKey = context.env.STRIPE_SECRET_KEY;
  
  if (!price_id) {
    return Response.json({ error: 'Missing price_id' }, { status: 400 });
  }
  
  // Create or get customer
  let customerId;
  const customerRes = await fetch('https://api.stripe.com/v1/customers?email=' + encodeURIComponent(email), {
    headers: { Authorization: `Bearer ${stripeKey}` },
  });
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
      body: new URLSearchParams({ email, name }),
    });
    const customer = await newCustomer.json();
    customerId = customer.id;
  }
  
  // Create Checkout Session
  const sessionRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      customer: customerId,
      'line_items[0][price]': price_id,
      'line_items[0][quantity]': '1',
      mode: 'subscription',
      'success_url': context.request.headers.get('origin') + '/dashboard?success=true',
      'cancel_url': context.request.headers.get('origin') + '/dashboard?canceled=true',
    }),
  });
  
  const session = await sessionRes.json();
  return Response.json({ url: session.url });
}
