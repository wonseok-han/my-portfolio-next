import { userData } from '@data/user';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(userData);
}
