import { NextResponse } from "next/server"

function generateFakeTxHash() {
  return (
    "0x" +
    Array(64)
      .fill(0)
      .map(() => Math.random().toString(16)[2])
      .join("")
  )
}

export async function GET() {
  // Simulate some delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const data = {
    totalBalance: 42069.42,
    changePercentage: 5.67,
    chartData: [
      { date: "2023-01-01", value: 4000 },
      { date: "2023-02-01", value: 3000 },
      { date: "2023-03-01", value: 5000 },
      { date: "2023-04-01", value: 4500 },
      { date: "2023-05-01", value: 6000 },
      { date: "2023-06-01", value: 5500 },
      { date: "2023-07-01", value: 7000 },
    ],
    assets: [
      { name: "Bitcoin", symbol: "BTC", balance: 1.5, price: 30000, change: 2.5, icon: "₿" },
      { name: "Ethereum", symbol: "ETH", balance: 15, price: 2000, change: -1.2, icon: "Ξ" },
      { name: "Cardano", symbol: "ADA", balance: 5000, price: 0.5, change: 5.7, icon: "₳" },
    ],
    transactions: [
      {
        id: 1,
        type: "send",
        amount: "0.1",
        crypto: "BTC",
        address: "0x1234...5678",
        date: "2023-07-01",
        hash: generateFakeTxHash(),
      },
      {
        id: 2,
        type: "receive",
        amount: "100",
        crypto: "ADA",
        address: "0x8765...4321",
        date: "2023-06-28",
        hash: generateFakeTxHash(),
      },
      {
        id: 3,
        type: "send",
        amount: "1.5",
        crypto: "ETH",
        address: "0x2468...1357",
        date: "2023-06-25",
        hash: generateFakeTxHash(),
      },
      {
        id: 4,
        type: "receive",
        amount: "500",
        crypto: "XRP",
        address: "0x1357...2468",
        date: "2023-06-20",
        hash: generateFakeTxHash(),
      },
      {
        id: 5,
        type: "send",
        amount: "50",
        crypto: "DOT",
        address: "0x3141...5926",
        date: "2023-06-15",
        hash: generateFakeTxHash(),
      },
    ],
  }

  return NextResponse.json(data)
}

