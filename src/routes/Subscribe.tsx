import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

interface Price {
  id: string;
  product_name: string;
  unit_amount: number;
  meter_name: string;
  interval: string;
}

export default function Subscribe() {
  const { user } = useUser();
  const [prices, setPrices] = useState<Price[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // These are your Stripe test prices (hardcoded for now)
    setPrices([
      {
        id: 'price_1TSuiZQyNHJ9tQdySWa6I1Ke',
        product_name: 'Inbox Triage',
        unit_amount: 50,
        meter_name: 'actionable_email_surfaced',
        interval: 'month',
      },
      {
        id: 'price_1TSuiZQyNHJ9tQdy3QG6Ikec',
        product_name: 'Inbox Triage',
        unit_amount: 50,
        meter_name: 'draft_accepted',
        interval: 'month',
      },
    ]);
  }, []);

  const handleSubscribe = async (priceId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price_id: priceId,
          email: user?.emailAddresses[0]?.emailAddress,
          name: user?.fullName,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error('Checkout failed', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Subscribe to LLai</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prices.map((price) => (
            <div key={price.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">{price.product_name}</h2>
              <p className="text-gray-600 text-sm mt-1">${price.unit_amount / 100} per {price.meter_name}</p>
              <p className="text-gray-500 text-xs mt-2">Billed monthly, metered usage</p>
              
              <button
                onClick={() => handleSubscribe(price.id)}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Redirecting...' : 'Subscribe with Stripe'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
