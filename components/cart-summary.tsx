"use client"

import { METHODS } from "http"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"

export function CartSummary() {
  const {
    totalPrice,
    formattedTotalPrice,
    cartCount,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart()
  const [islaoding, setLoading] = useState(false)
  const isDisabled = islaoding || cartCount !== 0

  const Shippingamount = cartCount! > 0 ? 500 : 0
  const totalamount = Number(totalPrice) + Shippingamount
  async function onCheckout() {
    const response = await fetch("/api/checkout", {
      method: "post",
      body: JSON.stringify(cartDetails),
    })
    const data = await response.json()
    const result = await redirectToCheckout(data.id)
    if (result?.error) {
      console.error(result)
    }
    setLoading(false)
  }
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">
            {formatCurrencyString({
              value: totalamount,
              currency: "SAR",
            })}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Shipping </span>
          </dt>
          <dd className="text-sm font-medium">
            {formatCurrencyString({
              value: Shippingamount,
              currency: "SAR",
            })}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">
            {formatCurrencyString({
              value: totalamount,
              currency: "SAR",
            })}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button className="w-full" onClick={onCheckout}>
          {islaoding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {islaoding ? "Loading..." : "Checkout"}
        </Button>
      </div>
    </section>
  )
}
