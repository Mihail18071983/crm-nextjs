'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCompany, getPromotions, editCompany, Promotion } from '@/lib/api';
import StatusLabel from '@/app/components/status-label';

export interface CompanyInfoProps {
  companyId: string;
}

export default function CompanyInfo({ companyId }: CompanyInfoProps) {
  const queryQlient = useQueryClient();

  const { data: company } = useQuery({
    queryKey: ['companies', companyId],
    queryFn: () => getCompany(companyId),
    staleTime: 10 * 1000,
  });

  const { data: promotions, isPending } = useQuery<Promotion[]>({
    queryKey: ['promotions', companyId],
    queryFn: async () => {
      return getPromotions({ companyId });
    },
    staleTime: 10 * 1000,
  });
  console.log('Promotions', promotions);

  const updateCompany = useMutation({
    mutationFn: editCompany,
    onSuccess: () => {
      queryQlient.invalidateQueries({ queryKey: ['companies', companyId] });
    },
    onError: (error, variables, context) => {
      alert(`Delete failed for company with id: ${variables?.id}`);
    },
  });

  useEffect(() => {
  if (companyId && promotions) {
    updateCompany.mutate({
      id: companyId,
      data: { hasPromotions: promotions.length > 0 },
    });
  }
}, [promotions, companyId, updateCompany]);

 
  if (!company) return null;
  return (
    <div className="flex flex-col gap-5">
      <div
        className="flex flex-col items-center p-7 gap-5 bg-gray-900 rounded cursor-pointer"
      >
        <div className="w-20 h-20 rounded-full bg-blue-500">
          {company.avatar && (
            <Image
              className="rounded-full w-full h-full"
              width={80}
              height={80}
              src={company.avatar}
              alt="company avatar"
            />
          )}
        </div>
        <p className="pb text-base font-semibold text-white">{company.title}</p>
        <StatusLabel status={company.status} />
      </div>
      <div className="p-7 text-base text-gray-900 bg-gray-100 rounded">
        <p className="pb-5 text-xl font-semibold">About company</p>
        <p className="pb-3">{`Category: ${company.categoryTitle}`}</p>
        <p className="pb-3">{`Country: ${company.countryTitle}`}</p>
        <p className="pb-3">{`Joined date: ${new Date(
          company.joinedDate,
        ).toLocaleDateString('uk')}`}</p>
        <div className="w-full h-px my-8 bg-gray-300" />
        <p>{company.description}</p>
      </div>
    </div>
  );
}
