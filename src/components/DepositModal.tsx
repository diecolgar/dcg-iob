import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDeposit } from "../redux/userSlice";

interface DepositModalProps {
  userId: string;
  onClose: () => void; // Function to close the modal
}

function DepositModal({ userId, onClose }: DepositModalProps) {
  // Local state for input value and error message
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  // Handles deposit logic and validation
  const handleDeposit = () => {
    if (amount === null || amount <= 0) {
      setError("The amount must be greater than 0.");
      return;
    }

    // Dispatch deposit action and close modal
    dispatch(addDeposit({ userId, amount }));
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full p-6 mx-4 bg-white shadow-md rounded-3xl max-w-96">
        <h2 className="mb-4 text-xl font-bold">Deposit ($)</h2>
        {/* Input for deposit amount */}
        <input
          type="number"
          value={amount !== null ? amount : ""}
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : null;
            setAmount(value);
          }}
          placeholder="0.00"
          className="w-full px-4 py-2 mb-4 border border-gray-200 rounded-xl"
        />
        {/* Error message */}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {/* Action buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded-full text-main hover:opacity-80"
          >
            Cancel
          </button>
          <button
            onClick={handleDeposit}
            className="px-4 py-2 text-white rounded-full bg-main hover:opacity-80"
          >
            Deposit
          </button>
        </div>
      </div>
    </div>
  );
}

export default DepositModal;
