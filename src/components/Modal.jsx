import React, { useState } from 'react';
import toast from 'react-hot-toast';
import PayPalButton from './PayPalButton';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const Modal = ({ isOpen, onClose, onPayWithStripe, amount }) => {
  const [showPayPalButton, setShowPayPalButton] = useState(false);

  const handlePayWithPayPal = () => {
    setShowPayPalButton(true);
  };

  const handleApprove = (details) => {
    toast('Transaction approved:', details);
    // Handle post-approval actions here
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-1/3 relative">
        <IconButton
          onClick={onClose}
          style={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon style={{ color: 'white' }} />
        </IconButton>
        <h2 className="text-xl font-semibold text-white mb-4">Confirm Purchase</h2>
        <p className="text-gray-400 mb-6">Would you like to proceed with the payment?</p>
        <div className="flex justify-between">
          <button
            onClick={() => { onPayWithStripe(); onClose(); }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Pay with Stripe
          </button>
          <button
            onClick={handlePayWithPayPal}
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg"
          >
            Pay with PayPal
          </button>
        </div>
        {showPayPalButton && (
          <div className="mt-4">
            <PayPalButton amount={amount} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
