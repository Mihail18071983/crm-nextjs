import { NextResponse, NextRequest } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get('image');
  console.log('file', file);
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No files received.' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(' ', '_');
  console.log('file name', filename);
  try {
     const filePath = path.join('public/images', filename);
    await writeFile(filePath, buffer);
    
   const imagePath = `${req.nextUrl.origin}/images/${filename}`;
    console.log('image path', imagePath);
    return NextResponse.json({
      Message: 'Success',
      status: 201,
      imagePath,
    });
  } catch (error) {
    console.log('Error occured ', error);
    return NextResponse.json({ Message: 'Failed', status: 500 });
  }
};
