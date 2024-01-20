'use client';

import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPromotions, Promotion as PromotionItem } from '@/lib/api';
import Promotion from '@/app/components/promotion';

export interface CompanyPromotionsProps {
  companyId: string;
}

export default function CompanyPromotions({
  companyId,
}: CompanyPromotionsProps) {
  const [items, setItems] = useState<PromotionItem[]>([]);

  const { data: promotions, isPending } = useQuery({
    queryKey: ['promotions', companyId],
    queryFn: () => {
      getPromotions({ companyId });
    },
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    if (promotions) {
      setItems(promotions);
    }
  }, [promotions]);

  const queryClient = useQueryClient();

  queryClient.fetchQuery({
    queryKey: ['filteredPromotions'],
    queryFn: () =>
      queryClient.getQueryData(['filteredPromotions', companyId]) || null,
  });

  const { data: filteredPromotions } = useQuery({
    queryKey: ['filteredPromotions'],
    queryFn: () => queryClient.getQueryData(['filteredPromotions', companyId]),
  });

  const displayPromotions = filteredPromotions ?? items;

  return isPending ? (
    <div>Loading...</div>
  ) : (
    <ul className="grid grid-cols-12 gap-5">
      {(displayPromotions as PromotionItem[])?.map((promotion) => (
        <li key={promotion.id} className="col-span-4 bg-gray-100">
          <Promotion promotion={promotion} />
        </li>
      ))}
    </ul>
  );
}
