"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Send } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const cryptos = [
  { name: "Bitcoin", symbol: "BTC" },
  { name: "Ethereum", symbol: "ETH" },
  { name: "Dogecoin", symbol: "DOGE" },
]

export default function SendTransaction() {
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0].symbol)

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Transaction Sent!",
      description: `You sent ${amount} ${selectedCrypto} to ${address}`,
    })

    setAddress("")
    setAmount("")
  }

  return (
    <form onSubmit={handleTransaction} className="space-y-4 mb-6">
      <div className="space-y-2">
        <Label htmlFor="address">Recipient Address</Label>
        <Input
          id="address"
          placeholder="Enter recipient's address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          placeholder="Enter amount to send"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="crypto">Cryptocurrency</Label>
        <Select onValueChange={setSelectedCrypto} defaultValue={selectedCrypto}>
          <SelectTrigger>
            <SelectValue placeholder="Select cryptocurrency" />
          </SelectTrigger>
          <SelectContent>
            {cryptos.map((crypto) => (
              <SelectItem key={crypto.symbol} value={crypto.symbol}>
                {crypto.name} ({crypto.symbol})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        <Send className="mr-2 h-4 w-4" /> Send Transaction
      </Button>
    </form>
  )
}

