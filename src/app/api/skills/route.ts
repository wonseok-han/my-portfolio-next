import { skillData } from '@data/skill';
import { sleep } from '@utils/promise';
import { NextResponse } from 'next/server';

export async function GET() {
  await sleep(3000);
  return NextResponse.json(skillData);
}
