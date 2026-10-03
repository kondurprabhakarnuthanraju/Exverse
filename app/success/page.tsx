export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-black">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Payment Successful
        </h1>

        <p className="mt-4 text-gray-400">
          Thank you for your purchase from ExVerse.
        </p>

        {params.order_id && (
          <p className="mt-6 break-all text-sm text-gray-500">
            Order ID: {params.order_id}
          </p>
        )}

        <a
          href="/"
          className="mt-8 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-black"
        >
          Back to ExVerse
        </a>
      </div>
    </main>
  );
}