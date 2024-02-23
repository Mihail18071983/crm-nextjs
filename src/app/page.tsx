import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/images/logo.png';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils/config/auth';
import { redirect } from 'next/navigation';

const links = [
  { id: '1', path: '/signin', name: 'Sign in' },
  { id: '2', path: '/signup', name: 'Sign up' },
];

export default async function Home() {
  const session = await getServerSession(authOptions);
    if (session) { 
      redirect('/dashboard')
  }
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="bg-slate-300 p-3 rounded-xl mx-auto w-fit mb-6">
              <Image width={100} src={logo} alt="Logo" />
            </div>
            <div className="divide-y divide-gray-200">
              <div className="pb-8 space-y-2 md:space-y-5">
                <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
                  Welcome to Our Website
                </h2>
                <p className="text-lg leading-7 text-gray-500">
                  We are a company dedicated to providing high-quality services.
                </p>
              </div>
              <div className="w-fit mx-auto gap-6 flex items-center content-between pt-8">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    className="text-base font-medium leading-6 text-indigo-500 hover:text-indigo-600"
                    href={link.path}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
