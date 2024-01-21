'use client';
import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Company, getCompanies, deleteCompany } from '@/lib/api';
import CompanyRow from '@/app/components/company-row';


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

  const deleteMutation = useMutation({
    // Mutation function
    mutationFn: deleteCompany,
    // onSuccess callback
    onSuccess: () => {
      // Invalidate and refetch to update the list
      queryClient.invalidateQueries({queryKey: ['companies']});
    },
    // onError callback
    onError: (error, variables, context) => {
      alert(`Delete failed for company with id: ${variables}`);
    },
  });


   const handleDelete = (id: string) => {
 
    if (window.confirm('Are you sure you want to delete this company?')) {
      deleteMutation.mutate(id); 
    }
  };

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
              <CompanyRow onDelete={()=>handleDelete(company.id)} key={company.id} company={company} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
