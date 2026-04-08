import { NextResponse } from 'next/server';
import { getJsonData } from '@utils/data';

export async function GET() {
  try {
    const jsonData = await getJsonData<SkillProps[]>('skills.json');
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('데이터 로딩 오류:', error);
    return NextResponse.json({ error: 'Data load error' }, { status: 500 });
  }
}
