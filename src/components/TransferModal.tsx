import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransfer } from "../redux/userSlice";
import { RootState } from "../redux/store";

interface TransferModalProps {
  fromUserId: string;
  onClose: () => void; // Function to close the modal
}

function TransferModal({ fromUserId, onClose }: TransferModalProps) {
  // Local state for transfer details and errors
  const [amount, setAmount] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const wallet = useSelector((state: RootState) => state.users.userWallets[fromUserId]);

  // Validate and open confirmation modal
  const handleOpenConfirmation = () => {
    if (!amount || amount <= 0) {
      setError("The amount must be above 0.");
      return;
    }

    if (!amount || amount > wallet.balance) {
      setError("Insufficient funds.");
      return;
    }

    if (!selectedUserId) {
      setError("Please select a recipient.");
      return;
    }

    setError(null);
    setConfirmationOpen(true);
  };

  // Confirm and dispatch transfer
  const handleConfirmTransfer = () => {
    if (amount === null) {
      setError("The amount cannot be empty.");
      return;
    }

    dispatch(addTransfer({ fromUserId, toUserId: selectedUserId!, amount }));
    setConfirmationOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full p-6 mx-4 bg-white shadow-md rounded-3xl max-w-96">
        <h2 className="mb-4 text-xl font-bold">Make transfer ($)</h2>
        {/* Select recipient */}
        <select
          value={selectedUserId || ""}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full px-4 py-2 mb-4 border outline-none border-gray rounded-xl"
        >
          <option value="" disabled>
            Select user
          </option>
          {users
            .filter((user) => user.id !== fromUserId)
            .map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
        </select>
        {/* Input transfer amount */}
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
        {/* Error messages */}
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
            onClick={handleOpenConfirmation}
            className="px-4 py-2 text-white rounded-full bg-main hover:opacity-80"
          >
            Continue
          </button>
        </div>
        {/* Confirmation modal */}
        {isConfirmationOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="p-6 bg-white shadow-md rounded-3xl w-[440px]">
              <h3 className="mb-4 text-lg font-semibold">Confirm Transfer</h3>
              <p className="mb-4">
                Are you sure you want to transfer <strong>${amount}</strong> to{" "}
                <strong>
                  {users.find((user) => user.id === selectedUserId)?.name || "Unknown User"}
                </strong>
                ?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setConfirmationOpen(false)}
                  className="px-4 py-2 bg-gray-100 rounded-full text-main hover:opacity-80"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmTransfer}
                  className="px-4 py-2 text-white rounded-full bg-main hover:opacity-80"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransferModal;
