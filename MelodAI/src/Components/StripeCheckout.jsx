import { useState, useEffect } from "react";

export function StripeCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE = import.meta.env.VITE_HTTP;

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_BASE}/api/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({}),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Server returned status ${response.status}: ${errorText || "Failed to initialize Stripe checkout session."}`,
        );
      }

      const data = await response.json();

      const redirectUrl = data.url || data.checkoutUrl;

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        throw new Error("No checkout URL found in response.");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center mt-10">
      <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold text-xl mx-auto shadow-sm mb-4">
        💳
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-2">Buy Credits</h2>
      <p className="text-xs text-slate-500 mb-6">
        Top up your balance to generate more AI soundscapes and tracks.
      </p>

      {error && (
        <div className="mb-4 p-3 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-lg text-center">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 text-sm shadow-xs transition-all duration-200 cursor-pointer disabled:opacity-50"
      >
        {loading ? "Redirecting to Stripe..." : "Proceed to Secure Checkout"}
      </button>
    </div>
  );
}
