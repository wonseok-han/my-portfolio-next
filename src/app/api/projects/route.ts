import { NextResponse } from 'next/server';
import { getJsonData } from '@utils/data';

export async function GET() {
  try {
    const jsonData = await getJsonData<SideProjectProps[]>('projects.json');
    // key를 숫자로 비교해야 10 이상에서도 최신순이 유지됩니다
    return NextResponse.json(
      jsonData.sort((a, b) => Number(b.key) - Number(a.key))
    );
  } catch (error) {
    console.error('데이터 로딩 오류:', error);
    return NextResponse.json({ error: 'Data load error' }, { status: 500 });
  }
}
