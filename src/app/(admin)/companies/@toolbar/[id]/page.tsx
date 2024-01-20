'use client';

import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Toolbar from '@/app/components/toolbar';
import SearchInput from '@/app/components/search-input';
import AddPromotionButton from '@/app/components/add-promotion-button';
import { getPromotions } from '@/lib/api';

export interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const queryClient = useQueryClient();
  const [searchQuery, setsearchQuery] = useState<string>('');

  const { data: promotions } = useQuery({
    queryKey: ['promotions', params.id],
    queryFn: () => getPromotions({ companyId: params.id }),
    staleTime: 10 * 1000,
  });

  const onFilterBySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchQuery(e.target.value);
  };

  const getFilteredPromotions = useMemo(() => {
    if (searchQuery === '') {
      return promotions;
    }
    const filtered = promotions?.filter((promotion) =>
      promotion.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return filtered;
  }, [promotions, searchQuery]);

  const onClick = () => {
    console.log('onClick');
    queryClient.setQueryData(
      ['filteredPromotions', params.id],
      getFilteredPromotions,
    );
    queryClient.invalidateQueries({queryKey: ['filteredPromotions']});
  };
  return (
    <Toolbar action={<AddPromotionButton companyId={params.id} />}>
      <SearchInput
        value={searchQuery}
        onChange={onFilterBySearch}
        onSearchClick={onClick}
      />
    </Toolbar>
  );
}
