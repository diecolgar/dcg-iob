import { render, screen } from "@testing-library/react";
import TransactionsList from "./TransactionsList";
import "@testing-library/jest-dom";

// Mock de datos de transacciones
const mockTransactions = [
  {
    id: "1",
    type: "deposit",
    amount: 100,
    date: "2024-11-19T10:00:00Z",
  },
  {
    id: "2",
    type: "transfer",
    amount: 50,
    date: "2024-11-18T12:00:00Z",
    from: "userA",
    to: "userB",
  },
];

// Mock de funciones auxiliares
const mockGetUserNameById = (userId: string) =>
  userId === "userA" ? "Ana" : "Daniel";

const mockFormatDate = (date: string) =>
  new Date(date).toLocaleDateString("es-ES");

describe("TransactionsList Component", () => {
  test("renders transactions correctly", () => {
    // Renderiza el componente con props mock
    render(
      <TransactionsList
        transactions={mockTransactions}
        loggedInUserId="userB"
        getUserNameById={mockGetUserNameById}
        formatDate={mockFormatDate}
      />
    );

    // Verifica la transacción de depósito
    expect(screen.getByText("+$100.00")).toBeInTheDocument(); // Monto
    expect(screen.getByText("Deposit")).toBeInTheDocument(); // Tipo de transacción

    // Verifica la transacción de transferencia
    expect(screen.getByText("-$50.00")).toBeInTheDocument(); // Monto
    expect(screen.getByText("from Ana")).toBeInTheDocument(); // Origen
    expect(screen.getByText(mockFormatDate("2024-11-18T12:00:00Z"))).toBeInTheDocument(); // Fecha formateada
  });
});
