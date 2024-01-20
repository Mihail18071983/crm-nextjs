'use client';

import React, { useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Toolbar from '@/app/components/toolbar';
import SearchInput from '@/app/components/search-input';
import AddCompanyButton from '@/app/components/add-company-button';
import { getCompanies } from '@/lib/api';

export interface PageProps {}

export default function Page({}: PageProps) {
  const queryClient = useQueryClient();
  const [searchQuery, setsearchQuery] = useState<string>('');
  

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
    staleTime: 10 * 1000,
  });

  const onFilterBySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchQuery(e.target.value);
  };

  const getfilteredCompanies = useMemo(() => {
    if (searchQuery === '') {
      return companies;
    }
    return companies?.filter((company) =>
      company.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [companies, searchQuery]);

  const onClick = () => {
    queryClient.setQueryData(['filteredCompanies'], getfilteredCompanies);
  };

  return (
    <Toolbar action={<AddCompanyButton />}>
      <SearchInput
        value={searchQuery}
        onChange={onFilterBySearch}
        onSearchClick={onClick}
      />
    </Toolbar>
  );
}
