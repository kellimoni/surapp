import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { format, parseISO } from "date-fns"

interface Transaction {
  id: number
  type: string
  amount: string
  crypto: string
  address: string
  date: string
  hash: string
}

interface TransactionHistoryProps {
  transactions: Transaction[] | null
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  if (!transactions) {
    return <div>Error loading transaction data.</div>
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <Card key={tx.id} className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "send" ? "bg-red-500" : "bg-green-500"}`}
                >
                  {tx.type === "send" ? (
                    <ArrowUpRight className="h-6 w-6 text-white" />
                  ) : (
                    <ArrowDownRight className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {tx.type === "send" ? "Sent" : "Received"} {tx.crypto}
                  </p>
                  <p className="text-sm text-muted-foreground">{tx.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">Hash: {tx.hash}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {tx.amount} {tx.crypto}
                </p>
                <p className="text-sm text-muted-foreground">{format(parseISO(tx.date), "MMM dd, yyyy")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

