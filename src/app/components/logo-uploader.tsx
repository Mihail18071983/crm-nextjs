'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export interface LogoUploaderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  square?: boolean;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage?: string;
}

export default function LogoUploader({
  square,
  label,
  placeholder,
  id,
  onFileChange,
  selectedImage,
  ...rest
}: LogoUploaderProps) {
  console.log('selectedImage', selectedImage);
  return (
    <div
      className={clsx(
        'flex mb-3',
        !square && 'gap-10',
        square && 'gap-2 flex-col',
      )}
    >
      {label && <p className="text-base color-gray-900">{label}</p>}
      <label
        htmlFor={id}
        className={clsx(
          'flex flex-col items-center justify-center h-40 bg-white border border-slate-900 border-dashed cursor-pointer',
          !square && 'w-40 rounded-full',
          square && 'w-full',
        )}
      >
        {selectedImage ? (
          <Image
            className="w-40 h-40 rounded-full"
            width={160}
            height={160}
            src={selectedImage}
            alt="upload"
          />
        ) : (
          <>
            <Image
              className="mb-1"
              width={48}
              height={48}
              src="/icons/upload.svg"
              alt="upload"
            />
            {placeholder && (
              <p className="text-base text-gray-500">{placeholder}</p>
            )}
          </>
        )}
        <input
          {...rest}
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </label>
    </div>
  );
}
