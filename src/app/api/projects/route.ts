import { projectData } from '@data/project';
import { sleep } from '@utils/promise';
import { NextResponse } from 'next/server';

export async function GET() {
  await sleep(3000);
  return NextResponse.json(
    projectData.sort((a, b) => (a.key < b.key ? 1 : -1))
  );
}
