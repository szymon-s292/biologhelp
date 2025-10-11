
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="h-screen flex justify-center items-center">
        <div className="w-fit">
          <header className="text-center text-2xl text-green-400">BiologHelp.pl Crack</header>
          <p className="text-center text-gray-600  mb-16">Wszystkie zadania do zapisania w pdf bez limitów</p>
          <div className="flex gap-8">
            <Link href="/chemia" className="px-8 py-4 rounded-full shadow hover:text-green-400 bg-gray-100">Zadania z chemii</Link>
            <Link href="/biologia" className="px-8 py-4 rounded-full shadow hover:text-green-400 bg-gray-100">Zadania z biologii</Link>
          </div>
        </div>
      </main>
    </>
  );
}
