import React from 'react';

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  console.log('id', params.id);
  return (
    <div>
      <p>{`Edit company id ${params.id}`}</p>
    </div>
  );
}
