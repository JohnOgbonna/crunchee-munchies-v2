"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const [countdown, setCountdown] = useState(5); // Countdown starts at 5 seconds
  const router = useRouter();

  useEffect(() => {
    if (countdown === 0) {
      router.push("/"); // Redirect to homepage when countdown reaches 0
    }

    const timer = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0)); // Decrease countdown
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on unmount
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-orange-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg">Redirecting to home in {countdown}...</p>
    </div>
  );
}
