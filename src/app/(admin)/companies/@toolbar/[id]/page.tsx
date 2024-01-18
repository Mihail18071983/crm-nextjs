'use client';

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Toolbar from '@/app/components/toolbar';
import SearchInput from '@/app/components/search-input';
import AddPromotionButton from '@/app/components/add-promotion-button';
import { getCompanies } from '@/lib/api';

export interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const [searchQuery, setsearchQuery] = useState<string>('');

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
    staleTime: 10 * 1000,
  });

  const onFilterBySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchQuery(e.target.value);
  };

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) {
      return companies;
    }
    return companies?.filter((company) =>
      company.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [companies, searchQuery]);

  const onClick = ()=>{
    console.log(filteredCompanies);
  }
  return (
    <Toolbar action={<AddPromotionButton companyId={params.id} />}>
      <SearchInput value={searchQuery} onChange={onFilterBySearch} onSearchClick={onClick} />
    </Toolbar>
  );
}
