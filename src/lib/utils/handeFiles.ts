export const handleFileChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setSelectedFile: (value: React.SetStateAction<File | undefined>) => void,
  setImagePath: (value: React.SetStateAction<string>) => void,
) => {
  const file = event.target.files?.[0];
  console.log('file', file);
  if (file) {
    setSelectedFile(file);
    setImagePath(URL.createObjectURL(file));
  }
};

export const handleUpload = async (
  selectedFile: File,
  setImagePath: (value: React.SetStateAction<string>) => void,
) => {
  try {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('image', selectedFile);
    return await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setImagePath(data.imagePath);
        return data;
      })
      .catch((error) => console.error(error));
  } catch (error: any) {
    console.log(error.response?.data);
  }
};
