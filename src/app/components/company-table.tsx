'use client';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Company, getCompanies } from '@/lib/api';
import CompanyRow from '@/app/components/company-row';
import { spawn } from 'child_process';

const headers = [
  'Category',
  'Company',
  'Status',
  'Promotion',
  'Country',
  'Joined date',
];

export default function CompanyTable() {
  const [items, setItems] = useState<Company[]>([]);

  const { data, isPending } = useQuery({
    queryKey: ['companies'],
    queryFn: () => {
      getCompanies();
    },
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  const queryClient = useQueryClient();

  queryClient.fetchQuery({
    queryKey: ['filteredCompanies'],
    queryFn: () => queryClient.getQueryData(['filteredCompanies']) || null,
  });

  const { data: filteredCompanies } = useQuery({
    queryKey: ['filteredCompanies'],
    queryFn: () => queryClient.getQueryData(['filteredCompanies']),
  });

  return (
    <div className="py-8 px-10 bg-gray-100">
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <table className="table-auto w-full border-separate border-spacing-y-2">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="pb-5 text-sm font-light text-gray-900 text-start"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {((filteredCompanies as Company[]) ?? items)?.map((company) => (
              <CompanyRow key={company.id} company={company} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
