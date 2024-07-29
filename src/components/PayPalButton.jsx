'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const PayPalButton = ({ amount }) => {
    const [sdkReady, setSdkReady] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const addPaypalSdk = async () => {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
            script.type = "text/javascript";
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            script.onerror = () => {
                setError('Failed to load PayPal SDK');
            };
            document.body.appendChild(script);
        };

        if (!window.paypal) {
            addPaypalSdk();
        } else {
            setSdkReady(true);
        }
    }, []);

    useEffect(() => {
        if (sdkReady) {
            window.paypal.Buttons({
                createOrder: async (data, actions) => {
                    const response = await fetch('/api/paypal/create-order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ amount }),
                    });

                    const orderData = await response.json();
                    if (orderData.error) {
                        throw new Error(orderData.error);
                    }

                    return orderData.id;
                },
                onApprove: async (data, actions) => {
                    const response = await fetch('/api/paypal/capture-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ orderID: data.orderID }),
                    });

                    const details = await response.json();
                    if (details.error) {
                        throw new Error(details.error);
                    }

                    toast.success('Transaction completed by ' + details.payer.name.given_name);
                },
                onError: (err) => {
                    setError('Error processing payment');
                }
            }).render('#paypal-button-container');
        }
    }, [sdkReady, amount]);

    return (
        <div>
            {error && <div className="error">{error}</div>}
            <div id="paypal-button-container"></div>
        </div>
    );
};

export default PayPalButton;
