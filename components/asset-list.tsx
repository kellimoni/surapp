"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { TransactionReceipt } from "./transaction-receipt"

interface Asset {
  name: string
  symbol: string
  balance: number
  price: number
  change: number
  icon: string
}

interface AssetListProps {
  assets: Asset[] | null
}

export default function AssetList({ assets }: AssetListProps) {
  const [isSendOpen, setIsSendOpen] = useState(false)
  const [isReceiveOpen, setIsReceiveOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")
  const [lastTransaction, setLastTransaction] = useState<any>(null)
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)

  if (!assets) {
    return <div>Error loading asset data.</div>
  }

  const handleSend = () => {
    if (selectedAsset && amount && address) {
      const txHash = generateFakeTxHash()
      const newTransaction = {
        type: "send",
        amount,
        crypto: selectedAsset.symbol,
        address,
        hash: txHash,
        date: new Date().toISOString(),
      }
      setLastTransaction(newTransaction)
      setIsReceiptOpen(true)
      toast({
        title: "Transaction Sent",
        description: `Sent ${amount} ${selectedAsset.symbol} to ${address}. Transaction Hash: ${txHash}`,
      })
      setIsSendOpen(false)
      setAmount("")
      setAddress("")
    }
  }

  const handleReceive = () => {
    if (selectedAsset) {
      const txHash = generateFakeTxHash()
      const newTransaction = {
        type: "receive",
        amount: amount || "0",
        crypto: selectedAsset.symbol,
        address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        hash: txHash,
        date: new Date().toISOString(),
      }
      setLastTransaction(newTransaction)
      setIsReceiptOpen(true)
      toast({
        title: "Funds Received",
        description: `Received ${amount || "0"} ${selectedAsset.symbol}. Transaction Hash: ${txHash}`,
      })
      setIsReceiveOpen(false)
      setAmount("")
    }
  }

  const generateFakeTxHash = () => {
    return (
      "0x" +
      Array(64)
        .fill(0)
        .map(() => Math.random().toString(16)[2])
        .join("")
    )
  }

  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <Card
          key={asset.symbol}
          className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  {asset.icon}
                </div>
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {asset.balance} {asset.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${(asset.balance * asset.price).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </p>
                <p className={`text-sm ${asset.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {asset.change >= 0 ? "+" : ""}
                  {asset.change}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          className="w-[48%]"
          onClick={() => {
            setSelectedAsset(assets[0])
            setIsReceiveOpen(true)
          }}
        >
          <ArrowDownLeft className="mr-2 h-4 w-4" />
          Receive
        </Button>
        <Button
          className="w-[48%] bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setSelectedAsset(assets[0])
            setIsSendOpen(true)
          }}
        >
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Send
        </Button>
      </div>

      <Dialog open={isSendOpen} onOpenChange={setIsSendOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send {selectedAsset?.symbol}</DialogTitle>
            <DialogDescription>Enter the amount and recipient address to send {selectedAsset?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                To Address
              </Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSend}>Send Transaction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReceiveOpen} onOpenChange={setIsReceiveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Receive {selectedAsset?.symbol}</DialogTitle>
            <DialogDescription>Your address to receive {selectedAsset?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="receiveAddress" className="text-right">
                Your Address
              </Label>
              <Input
                id="receiveAddress"
                value="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                readOnly
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleReceive}>Simulate Receive</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {lastTransaction && (
        <TransactionReceipt
          isOpen={isReceiptOpen}
          onClose={() => setIsReceiptOpen(false)}
          transaction={lastTransaction}
        />
      )}
    </div>
  )
}

