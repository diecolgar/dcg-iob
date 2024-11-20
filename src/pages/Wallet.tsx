import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import DepositModal from "../components/DepositModal";
import TransferModal from "../components/TransferModal";
import TransactionsList from "../components/TransactionsList";
import SimpleButton from "dcg-iob";

function Wallet() {
  // Local state for controlling modal visibility
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isTransferModalOpen, setTransferModalOpen] = useState(false);

  // Select logged-in user and wallet data from Redux store
  const loggedInUser = useSelector((state: RootState) => state.users.loggedInUser);
  const userWallets = useSelector((state: RootState) => state.users.userWallets);
  const users = useSelector((state: RootState) => state.users.users);

  // Redirect to login page if no user is logged in
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  // Get the wallet data for the logged-in user
  const wallet = userWallets[loggedInUser.id];

  // Helper function to get a user's name by their ID
  const getUserNameById = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  // Helper function to format transaction dates
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "yesterday";
    } else {
      return date.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
    }
  };

  return (
    <div className="flex flex-col items-center container mx-auto p-8 h-full w-[1280px] max-w-full">
      {/* Display the user's total balance */}
      <div className="px-8 py-4 bg-white shadow-xl rounded-3xl">
        <p className="text-4xl font-bold text-main">${wallet.balance.toFixed(2)}</p>
      </div>

      {/* Action buttons for Deposit and Transfer */}
      <div className="flex mt-6 mb-8 space-x-4">
        <SimpleButton
          label="Deposit"
          backgroundColor="#1C939C"
          onClick={() => setDepositModalOpen(true)} // Open deposit modal
        />
        <SimpleButton
          label="Transfer"
          backgroundColor="#1C9C80"
          onClick={() => setTransferModalOpen(true)} // Open transfer modal
        />
      </div>

      {/* Conditionally render Deposit Modal */}
      {isDepositModalOpen && (
        <DepositModal
          userId={loggedInUser.id}
          onClose={() => setDepositModalOpen(false)} // Close deposit modal
        />
      )}

      {/* Conditionally render Transfer Modal */}
      {isTransferModalOpen && (
        <TransferModal
          fromUserId={loggedInUser.id}
          onClose={() => setTransferModalOpen(false)} // Close transfer modal
        />
      )}

      {/* Transaction history section */}
      <h2 className="mt-20 text-xl font-semibold">Transaction History</h2>
      <TransactionsList
        transactions={wallet.transactions} // List of transactions
        loggedInUserId={loggedInUser.id} // Current user's ID
        getUserNameById={getUserNameById} // Function to resolve user names
        formatDate={formatDate} // Function to format dates
      />
    </div>
  );
}

export default Wallet;
