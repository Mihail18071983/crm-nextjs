

import React from 'react';
import CompanyForm from '@/app/components/company-form';

export interface PageProps {}

const Page=()=> {
  return (
    <div className="py-6 px-10">
      <CompanyForm />
    </div>
  );
}


export default Page