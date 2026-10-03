"use client";

import { useState } from "react";

const products = [
  {
    id: "resume-19",
    name: "Professional Resume",
    description: "ATS-friendly professional resume template.",
    price: 19,
  },
  {
    id: "resume-jd-49",
    name: "JD-Oriented Resume",
    description: "Resume optimized for a specific job description.",
    price: 49,
  },
];

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null);

  async function buyProduct(productId: string) {
    try {
      setLoading(productId);

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create order");
      }

      console.log("Cashfree Order:", data);

      alert("Order created successfully. Cashfree checkout will be connected next.");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(null);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold tracking-tight">
            ExVerse
          </h1>

          <span className="text-sm text-gray-400">
            Digital Products
          </span>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-400">
            Simple. Affordable. Digital.
          </p>

          <h2 className="text-5xl font-bold tracking-tight md:text-7xl">
            Build a better
            <br />
            <span className="text-gray-400">
              professional future.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
            Premium digital products designed to help students and
            professionals move faster.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-400">
                    {product.description}
                  </p>
                </div>

                <div className="text-3xl font-bold">
                  ₹{product.price}
                </div>
              </div>

              <button
                onClick={() => buyProduct(product.id)}
                disabled={loading === product.id}
                className="mt-8 w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading === product.id
                  ? "Processing..."
                  : `Buy for ₹${product.price}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-gray-500">
          © 2026 ExVerse. All rights reserved.
        </div>
      </footer>
    </main>
  );
}