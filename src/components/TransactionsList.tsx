import TransferIcon from "../icons/TransferIcon";
import DepositIcon from "../icons/DepositIcon";

interface Transaction {
  id: string;
  type: "transfer" | "deposit";
  amount: number;
  date: string;
  from?: string;
  to?: string;
}

interface TransactionsListProps {
  transactions: Transaction[];
  loggedInUserId: string;
  getUserNameById: (userId: string) => string;
  formatDate: (dateString: string) => string;
}

function TransactionsList({
  transactions,
  loggedInUserId,
  getUserNameById,
  formatDate,
}: TransactionsListProps) {
  return (
    <ul className="mt-4 bg-white border border-gray-200 rounded-2xl w-96">
      {transactions.slice().reverse().map((transaction) => (
        <li
          key={transaction.id}
          className="flex justify-between px-6 py-3 border-b border-gray-200 hover:bg-gray-100"
        >
          <div className="flex gap-6">
            {/* Transaction type icon */}
            <div className="mt-1">
              {transaction.type === "transfer" ? (
                <TransferIcon width={16} height={16} classnamepath="stroke-gray-400" />
              ) : (
                <DepositIcon width={14} height={14} classnamepath="stroke-gray-400" />
              )}
            </div>

            {/* Transaction details */}
            <div className="flex flex-col">
              <div
                className={`text-sm font-semibold ${
                  transaction.type === "transfer" && transaction.to !== loggedInUserId
                    ? "text-red-500"
                    : "text-main"
                }`}
              >
                {transaction.type === "transfer" && transaction.to !== loggedInUserId
                  ? `-$${transaction.amount.toFixed(2)}`
                  : `+$${transaction.amount.toFixed(2)}`}
              </div>
              <div className="text-sm text-gray-700">
                {transaction.type === "transfer"
                  ? transaction.to === loggedInUserId
                    ? `from ${getUserNameById(transaction.from!)}`
                    : `to ${getUserNameById(transaction.to!)}`
                  : "Deposit"}
              </div>
            </div>
          </div>
          {/* Transaction date */}
          <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
        </li>
      ))}
    </ul>
  );
}

export default TransactionsList;
