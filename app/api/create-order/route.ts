import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

function getCashfreeBaseUrl() {
  return process.env.CASHFREE_ENVIRONMENT === "PRODUCTION"
    ? "https://api.cashfree.com"
    : "https://sandbox.cashfree.com";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = getProduct(body.productId);

    if (!product) {
      return NextResponse.json(
        { error: "Invalid product" },
        { status: 400 }
      );
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!appId || !secretKey || !siteUrl) {
      return NextResponse.json(
        {
          error:
            "Cashfree environment variables are not configured.",
        },
        { status: 500 }
      );
    }

    const orderId = `EXVERSE_${Date.now()}`;

    const response = await fetch(
      `${getCashfreeBaseUrl()}/pg/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2025-01-01",
          "x-client-id": appId,
          "x-client-secret": secretKey,
        },
        body: JSON.stringify({
          order_id: orderId,
          order_amount: product.price,
          order_currency: "INR",

          customer_details: {
            customer_id: `customer_${Date.now()}`,
            customer_name: "ExVerse Customer",
            customer_email: "customer@example.com",
            customer_phone: "9999999999",
          },

          order_meta: {
            return_url: `${siteUrl}/success?order_id={order_id}`,
          },

          order_note: `Purchase of ${product.name}`,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree error:", data);

      return NextResponse.json(
        {
          error: "Cashfree order creation failed",
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: data.order_id,
      paymentSessionId: data.payment_session_id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}