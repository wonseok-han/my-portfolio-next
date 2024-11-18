import { projectData } from '@data/project';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    projectData.sort((a, b) => (a.key < b.key ? 1 : -1))
  );
}
