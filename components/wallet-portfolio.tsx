"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { format } from "date-fns"

interface WalletPortfolioProps {
  data: {
    totalBalance: number
    changePercentage: number
    chartData: Array<{ date: string; value: number }>
  } | null
}

export default function WalletPortfolio({ data }: WalletPortfolioProps) {
  if (!data) {
    return <div>Error loading wallet data.</div>
  }

  const { totalBalance, changePercentage, chartData } = data

  return (
    <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
      <CardContent className="pt-6">
        <h2 className="text-lg font-medium mb-2">Total Balance</h2>
        <div className="text-4xl font-bold mb-4">
          ${totalBalance.toLocaleString("en-US", { maximumFractionDigits: 2 })}
        </div>
        <div className="flex items-center mb-6">
          {changePercentage >= 0 ? (
            <ArrowUpRight className="h-5 w-5 mr-1 text-green-400" />
          ) : (
            <ArrowDownRight className="h-5 w-5 mr-1 text-red-400" />
          )}
          <span className={changePercentage >= 0 ? "text-green-400" : "text-red-400"}>{changePercentage}% (24h)</span>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" tickFormatter={(tick) => format(new Date(tick), "MMM")} />
              <Tooltip
                labelFormatter={(label) => format(new Date(label), "MMM dd, yyyy")}
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Value"]}
              />
              <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

