import './globals.css'
import Header from "@/components/Header";
import { CartProvider } from "@/context/cartcontext"
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Clol Stores',
  description: 'Ecommerce Sore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body >


        <CartProvider>
          <Header />
          <Toaster />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
