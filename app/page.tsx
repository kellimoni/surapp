import WalletPortfolio from "@/components/wallet-portfolio"
import AssetList from "@/components/asset-list"
import TransactionHistory from "@/components/transaction-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function getWalletData() {
  try {
    const res = await fetch("/api/wallet-data", { next: { revalidate: 60 } })
    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
    return res.json()
  } catch (error) {
    console.error("Error fetching wallet data:", error)
    return null
  }
}

export default async function Home() {
  const data = await getWalletData()

  if (!data) {
    return <div>Error loading wallet data. Please try again later.</div>
  }

  return (
    <main className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
        CryptoVault
      </h1>
      <WalletPortfolio data={data} />
      <Tabs defaultValue="assets" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="assets">
          <AssetList assets={data.assets} />
        </TabsContent>
        <TabsContent value="activity">
          <TransactionHistory transactions={data.transactions} />
        </TabsContent>
      </Tabs>
    </main>
  )
}

