import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-6xl text-center text-blue-500">Time Table</h1>
      <button onClick={() => router.push("/getCredentials")}>Login</button>
    </div>
  );
}
