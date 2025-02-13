import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Transaction {
  type: string
  amount: string
  crypto: string
  address: string
  hash: string
  date: string
}

interface TransactionReceiptProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
}

export function TransactionReceipt({ isOpen, onClose, transaction }: TransactionReceiptProps) {
  if (!transaction) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Receipt</DialogTitle>
          <DialogDescription>Details of your recent transaction</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Type:</span>
            <span className="col-span-2">{transaction.type === "send" ? "Sent" : "Received"}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Amount:</span>
            <span className="col-span-2">
              {transaction.amount} {transaction.crypto}
            </span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">{transaction.type === "send" ? "To:" : "From:"}</span>
            <span className="col-span-2">{transaction.address}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Transaction Hash:</span>
            <span className="col-span-2 break-all">{transaction.hash}</span>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <span className="font-medium">Date:</span>
            <span className="col-span-2">{new Date(transaction.date).toLocaleString()}</span>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  )
}

