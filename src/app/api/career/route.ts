import { careerData } from '@data/career';
import { sleep } from '@utils/promise';
import { NextResponse } from 'next/server';

export async function GET() {
  await sleep(3000);
  return NextResponse.json(careerData.sort((a, b) => (a.key < b.key ? 1 : -1)));
}
