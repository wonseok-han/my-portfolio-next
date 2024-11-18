import { careerData } from '@data/career';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(careerData.sort((a, b) => (a.key < b.key ? 1 : -1)));
}
