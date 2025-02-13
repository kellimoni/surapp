"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Send, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PrankTransaction() {
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [transactionType, setTransactionType] = useState("fake")

  const handleTransaction = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (transactionType === "fake") {
      toast({
        title: "Fake Transaction Sent!",
        description: `You pranked sending $${amount} to ${address}`,
      })
    } else {
      toast({
        title: "Flash Transaction Complete!",
        description: `Flashed $${amount} to ${address} and back instantly`,
      })
    }

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
        <Label htmlFor="amount">Amount (USD)</Label>
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
        <Label htmlFor="type">Transaction Type</Label>
        <Select onValueChange={setTransactionType} defaultValue={transactionType}>
          <SelectTrigger>
            <SelectValue placeholder="Select transaction type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fake">Fake Transaction</SelectItem>
            <SelectItem value="flash">Flash Transaction</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">
        {transactionType === "fake" ? (
          <>
            <Send className="mr-2 h-4 w-4" /> Send Fake Transaction
          </>
        ) : (
          <>
            <Zap className="mr-2 h-4 w-4" /> Execute Flash Transaction
          </>
        )}
      </Button>
    </form>
  )
}

