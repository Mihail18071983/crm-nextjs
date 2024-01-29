'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import StatusLabel from '@/app/components/status-label';
import { Company } from '@/lib/api';
import delIcon from '../../../public/icons/backspace.svg';

export interface CompanyRowProps {
  company: Company;
  onDelete: () => void;
}

export default function CompanyRow({ company, onDelete }: CompanyRowProps) {
  const router = useRouter();
  return (
    <tr className="h-14   text-gray-900 bg-white alig-center  mb-2 last:mb-0">
      <td
        className={clsx(
          'w-[15%] text-xs font-medium text-blue-700 rounded-l border-l-4 pl-2',
          company.status === 'active' && 'border-green-700',
          company.status === 'pending' && 'border-yellow-700',
          company.status === 'suspended' && 'border-blue-700',
          company.status === 'notActive' && 'border-red-700',
        )}
      >
        {company.categoryTitle}
      </td>
      <td className="w-[32%]">
        <Link
          className="flex items-center gap-4"
          href={`/companies/${company.id}`}
        >
          <Image
            className="rounded-full w-8 h-8"
            width={32}
            height={32}
            src={company.avatar || ''}
            alt="avatar"
          />
          <p>{company.title}</p>
        </Link>
      </td>
      <td className="w-[15%]">
        <StatusLabel status={company.status} />
      </td>
      <td className="w-[15%]">
        <div
          onClick={() => {
            router.push(`/companies/${company.id}/edit`, {
              scroll: false,
            });
          }}
          className="inline-flex items-center gap-1 cursor-pointer"
        >
          <Image
            width={16}
            height={16}
            src={`/icons/${company.hasPromotions ? 'check' : 'x-mark'}.svg`}
            alt="promotion icon"
          />
          <span
            className={clsx(
              'text-sm font-medium',
              company.hasPromotions ? 'text-green-700' : 'text-red-700',
            )}
          >
            {company.hasPromotions ? 'Yes' : 'No'}
          </span>
        </div>
      </td>
      <td>{company.countryTitle}</td>
      <td className="rounded-r">
        {new Date(company.joinedDate).toLocaleDateString('uk-UA')}
      </td>
      <td>
        <button className="align-middle" type="button" onClick={onDelete}>
          <Image src={delIcon} alt="delIcon" />
        </button>
      </td>
    </tr>
  );
}
