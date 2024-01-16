import { NextResponse, NextRequest } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req:NextRequest) => {
  const formData = await req.formData();
  console.log(formData);

  const file = formData.get("file");
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename =  file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), "/avatars/" + filename),
      buffer
    );
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
