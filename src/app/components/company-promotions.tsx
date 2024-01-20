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
 
  const { data:promotions, isPending } = useQuery({
    queryKey: ['promotions', companyId],
    queryFn: () => { getPromotions({ companyId }) },
    staleTime: 10 * 1000,
  });

    useEffect(() => {
    if (promotions) {
      setItems(promotions);
    }
  }, [promotions]);

  console.log("promotions", promotions);
  const queryClient = useQueryClient();
  
    queryClient.fetchQuery({
    queryKey: ['filteredPromotions'],
    queryFn: () => queryClient.getQueryData(['filteredPromotions', companyId]) || null,
    });
  
  const { data: filteredPromotions } = useQuery({
    queryKey: ['filteredPromotions'],
    queryFn: () => queryClient.getQueryData(['filteredPromotions', companyId]),
  });



  console.log("filtered promotions", filteredPromotions);

  const displayPromotions = filteredPromotions ?? items;

  console.log("displayPromotions", displayPromotions);

  return (
    <div className="grid grid-cols-12 gap-5">
      {(displayPromotions as PromotionItem[])?.map((promotion) => (
        <div key={promotion.id} className="col-span-4">
          <Promotion promotion={promotion} />
        </div>
      ))}
    </div>
  );
}
