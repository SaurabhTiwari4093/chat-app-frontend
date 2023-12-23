"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <main>
      <div>Home Page</div>
    </main>
  );
}

export default Home;
