import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins } from "lucide-react"

const cryptos = [
  { name: "Bitcoin", symbol: "BTC", balance: 42.69, price: 30000 },
  { name: "Ethereum", symbol: "ETH", balance: 500, price: 2000 },
  { name: "Dogecoin", symbol: "DOGE", balance: 1000000, price: 0.08 },
]

export default function WalletBalance() {
  const totalBalance = cryptos.reduce((acc, crypto) => acc + crypto.balance * crypto.price, 0)

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
        <Coins className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${totalBalance.toLocaleString("en-US", { maximumFractionDigits: 2 })}</div>
        <div className="mt-4 space-y-2">
          {cryptos.map((crypto) => (
            <div key={crypto.symbol} className="flex justify-between items-center">
              <span>{crypto.name}</span>
              <span className="font-medium">
                {crypto.balance.toLocaleString("en-US", { maximumFractionDigits: 4 })} {crypto.symbol}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

