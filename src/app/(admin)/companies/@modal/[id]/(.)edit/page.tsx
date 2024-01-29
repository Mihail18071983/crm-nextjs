import React from 'react';
import Modal from '@/app/components/Modal1';

export interface Props {
  params: { id: string };
}

export default function Page({ params }: Props) {
  return (
    <Modal>
      <p>{`Edit company id ${params.id} in modal`}</p>
    </Modal>
  );
}
