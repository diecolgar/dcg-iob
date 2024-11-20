import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface for user information
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Interface for a single transaction
interface Transaction {
  id: string;
  type: "transfer" | "deposit"; // Type of transaction
  amount: number;
  date: string;
  from?: string; // Sender (optional for deposits)
  to?: string; // Receiver (optional for deposits)
}

// Interface for a user's wallet
interface Wallet {
  balance: number; // Current balance
  transactions: Transaction[]; // List of transactions
}

// State structure for managing users and wallets
interface UserState {
  users: User[]; // List of registered users
  loggedInUser: User | null; // Currently logged-in user
  registerErrorMessage: string | null; // Error message for registration
  loginErrorMessage: string | null; // Error message for login
  userWallets: Record<string, Wallet>; // Wallets keyed by user ID
}

// Initial state of the user slice
const initialState: UserState = {
  users: [],
  loggedInUser: null,
  registerErrorMessage: null,
  loginErrorMessage: null,
  userWallets: {}, // No wallets at the start
};

// Slice definition with reducers
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    /**
     * Register a new user.
     * Initializes the user's wallet and logs them in automatically.
     */
    registerUser(state, action: PayloadAction<Omit<User, "id">>) {
      const { email } = action.payload;

      // Check if the email is already registered
      const emailExists = state.users.some((user) => user.email === email);
      if (emailExists) {
        state.registerErrorMessage = "The email is already registered.";
        return;
      }

      // Create a new user object
      const newUser: User = {
        id: Date.now().toString(), // Generate a unique ID based on timestamp
        ...action.payload,
      };

      // Add the new user to the list and log them in
      state.users.push(newUser);
      state.loggedInUser = newUser;

      // Initialize an empty wallet for the new user
      state.userWallets[newUser.id] = {
        balance: 0,
        transactions: [],
      };

      // Clear any registration error messages
      state.registerErrorMessage = null;
    },

    /**
     * Log in an existing user by email and password.
     * Validates credentials and sets the logged-in user in the state.
     */
    loginUser(state, action: PayloadAction<{ email: string; password: string }>) {
      const { email, password } = action.payload;

      // Find the user with matching credentials
      const user = state.users.find((u) => u.email === email && u.password === password);
      if (user) {
        state.loggedInUser = user; // Log in the user
        state.loginErrorMessage = null; // Clear any login error
      } else {
        // If no match, set error message
        state.loggedInUser = null;
        state.loginErrorMessage = "Incorrect email or password.";
      }
    },

    /**
     * Log out the current user.
     */
    logoutUser(state) {
      state.loggedInUser = null; // Clear the logged-in user
    },

    /**
     * Add a deposit to a user's wallet.
     * Increases the user's balance and logs the transaction.
     */
    addDeposit(state, action: PayloadAction<{ userId: string; amount: number }>) {
      const { userId, amount } = action.payload;

      // Find the user's wallet and update it
      const wallet = state.userWallets[userId];
      if (wallet) {
        wallet.balance += amount; // Increase balance
        wallet.transactions.push({
          id: Date.now().toString(),
          type: "deposit",
          amount,
          date: new Date().toISOString(),
        }); // Add transaction
      }
    },

    /**
     * Transfer funds between users.
     * Deducts from the sender's wallet and credits the receiver's wallet.
     */
    addTransfer(
      state,
      action: PayloadAction<{
        fromUserId: string; // Sender
        toUserId: string; // Receiver
        amount: number; // Transfer amount
      }>
    ) {
      const { fromUserId, toUserId, amount } = action.payload;
      const fromWallet = state.userWallets[fromUserId];
      const toWallet = state.userWallets[toUserId];

      // Validate wallets and check if sender has enough balance
      if (fromWallet && toWallet && fromWallet.balance >= amount) {
        // Deduct amount from sender's wallet
        fromWallet.balance -= amount;
        fromWallet.transactions.push({
          id: Date.now().toString(),
          type: "transfer",
          amount,
          date: new Date().toISOString(),
          from: fromUserId,
          to: toUserId,
        });

        // Credit amount to receiver's wallet
        toWallet.balance += amount;
        toWallet.transactions.push({
          id: Date.now().toString(),
          type: "transfer",
          amount,
          date: new Date().toISOString(),
          from: fromUserId,
          to: toUserId,
        });
      }
    },

    /**
     * Clear all error messages.
     * Used to reset the state when navigating between pages.
     */
    clearErrorMessages(state) {
      state.registerErrorMessage = null;
      state.loginErrorMessage = null;
    },
  },
});

// Export actions to be used in components
export const {
  registerUser,
  loginUser,
  logoutUser,
  addDeposit,
  addTransfer,
  clearErrorMessages,
} = userSlice.actions;

// Export reducer for store configuration
export default userSlice.reducer;
