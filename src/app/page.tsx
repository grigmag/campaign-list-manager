"use client";

import { useGetSubscribers } from "~/requests/useGetSubscribers";

export default function HomePage() {
  const getSubscribersQuery = useGetSubscribers();

  let content: JSX.Element | undefined;

  if (getSubscribersQuery.isLoading) {
    content = (
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Loading subscribers...
        </h2>
      </div>
    );
  } else if (getSubscribersQuery.isError) {
    content = (
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Error loading subscribers
        </h2>
        <p className="text-lg text-white/50">
          {getSubscribersQuery.error.message}
        </p>
      </div>
    );
  } else if (getSubscribersQuery.data) {
    const list = getSubscribersQuery.data.data.map((subscriber) => (
      <div key={subscriber.email} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{subscriber.name}</h2>
        <p className="text-lg text-white/50">{subscriber.email}</p>
      </div>
    ));

    content = (
      <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h2 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Subscribers
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          {list}
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Campaign List Manager
        </h1>

        {content}
      </div>
    </main>
  );
}
