'use client';

import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  CompanyStatus,
  createCompany,
  getCategories,
  getCountries,
} from '@/lib/api';
import Button from '@/app/components/button';
import InputField from '@/app/components/input-field';
import LogoUploader from '@/app/components/logo-uploader';
import StatusLabel from '@/app/components/status-label';

export type CompanyFieldValues = {
  title: string;
  description: string;
  status: CompanyStatus;
  joinedDate: string;
  categoryId: string;
  countryId: string;
  avatar?: string;
};

const initialValues: CompanyFieldValues = {
  title: '',
  description: '',
  status: CompanyStatus.Active,
  joinedDate: '',
  categoryId: '',
  countryId: '',
  avatar: '',
};

export interface CompanyFormProps {
  onSubmit?: (values: CompanyFieldValues) => void | Promise<void>;
}

export default function CompanyForm({ onSubmit }: CompanyFormProps) {
  const queryClient = useQueryClient();

  const [imagePath, setImagePath] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('file', file);
    if (file) {
      setSelectedFile(file);
      setImagePath(URL.createObjectURL(file))
    }
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append('image', selectedFile);
      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setImagePath(data.imagePath);
        })
        .catch((error) => console.error(error));
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 10 * 1000,
  });

  const { data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: 10 * 1000,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
      });
    },
  });

  const handleSubmit = async (values: CompanyFieldValues) => {
    await handleUpload();
    await mutateAsync({
      ...values,
      categoryTitle:
        categories?.find(({ id }) => id === values.categoryId)?.title ?? '',
      countryTitle:
        countries?.find(({ id }) => id === values.countryId)?.title ?? '',
      avatar: imagePath,
    });

    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="flex flex-col gap-10">
        <p className="mb-0.5 text-xl">Add new company</p>
        <div className="flex gap-6">
          <div className="flex flex-col flex-1 gap-5">
            <LogoUploader
              onFileChange={handleFileChange}
              selectedImage={imagePath}
              label="Logo"
              placeholder="Upload photo"
            />
            <InputField
              required
              label="Status"
              placeholder="Status"
              name="status"
              as="select"
            >
              {(Object.values(CompanyStatus) as CompanyStatus[]).map(
                (status) => (
                  <option key={status} value={status}>
                    <StatusLabel status={status} styled={false} />
                  </option>
                ),
              )}
            </InputField>
            <InputField
              required
              label="Country"
              placeholder="Country"
              name="countryId"
              as="select"
            >
              {countries?.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.title}
                </option>
              ))}
            </InputField>
          </div>
          <div className="flex flex-col flex-1 gap-5">
            <InputField required label="Name" placeholder="Name" name="title" />
            <InputField
              required
              label="Category"
              placeholder="Category"
              name="categoryId"
              as="select"
            >
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </InputField>
            <InputField
              required
              label="Joined date"
              type="date"
              name="joinedDate"
            />
            <InputField
              required
              label="Description"
              placeholder="Description"
              name="description"
            />
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          Add company
        </Button>
      </Form>
    </Formik>
  );
}
