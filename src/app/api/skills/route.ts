import { skillData } from '@data/skill';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(skillData);
}
