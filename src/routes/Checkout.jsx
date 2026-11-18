import { createFileRoute } from '@tanstack/react-router';
import { StripeCheckout } from '../components/StripeCheckout'; // Adjust path to your StripeCheckout component

export const Route = createFileRoute('/Checkout')({
  component: CheckoutPage,
});

function CheckoutPage() {
    return (
        <div className="min-h-[calc(100vh-73px)] bg-slate-50 py-12 px-4 flex items-center justify-center">
            <div className="w-full max-w-lg">
                <StripeCheckout />
            </div>
        </div>
    );
}