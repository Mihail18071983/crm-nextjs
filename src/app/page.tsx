import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1 className="text-xl">Home page</h1>
      <Link className="text-xl p-2" href="/companies">
        Go to the Companies
      </Link>
    </main>
  );
}
