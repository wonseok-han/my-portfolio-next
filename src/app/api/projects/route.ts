import { NextResponse } from 'next/server';
import { getJsonData } from '@utils/data';

export async function GET() {
  try {
    const jsonData = await getJsonData<SideProjectProps[]>('projects.json');
    return NextResponse.json(jsonData.sort((a, b) => (a.key < b.key ? 1 : -1)));
  } catch (error) {
    console.error('데이터 로딩 오류:', error);
    return NextResponse.json({ error: 'Data load error' }, { status: 500 });
  }
}
