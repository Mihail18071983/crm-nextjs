import { NextResponse, NextRequest } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'No files received.' },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replaceAll(' ', '_');

    const relativeFilePath = path.join('images', filename);
    const filePath = path.join(process.cwd(), 'public', relativeFilePath);

    await writeFile(filePath, buffer);

    const imagePath = `/${relativeFilePath}`;

    return NextResponse.json({
      Message: 'Success',
      status: 201,
      imagePath,
    });
  } catch (error) {
    console.error('Error occurred', error);
    return NextResponse.json({ Message: 'Failed', status: 500 });
  }
};
