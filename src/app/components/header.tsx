import React from 'react';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils/config/auth';

export interface HeaderProps {
  children: React.ReactNode;
}

export default async function Header({ children }: HeaderProps) {
  const session = await getServerSession(authOptions);
  return (
    <header className="flex items-center gap-5 py-6	px-10 border-b border-gray-300">
      <h1 className="flex-1 text-3xl font-semibold text-gray-900">
        {children}
      </h1>
      <div className="w-px self-stretch bg-gray-300" />
      <div className="flex gap-3">
        {session?.user?.image ? (
          <Image
            width={44}
            height={44}
            src={session?.user?.image}
            alt="avatar"
            className='rounded-full'
          />
        ) : (
          <Image width={44} height={44} src="/images/avatar.png" alt="avatar" />
        )}
        <div>
          {session?.user?.image && (
            <p className="text-base	font-semibold text-gray-900">
              {session.user.name}
            </p>
          )}
          {session?.user?.email && (
            <p className="text-sm	font-light text-gray-900">
              {session.user?.email}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
