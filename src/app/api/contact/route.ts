import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Contact 폼 이메일 전송 API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 유효성 검사
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 전송
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Resend 기본 도메인
      to: process.env.CONTACT_EMAIL || 'your@email.com', // 받을 이메일 주소
      replyTo: email, // 답장 주소를 보낸 사람의 이메일로 설정
      subject: `Portfolio 문의: ${name}님으로부터`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">새로운 문의가 도착했습니다</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>이메일:</strong> ${email}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">메시지 내용:</h3>
            <p style="color: #6b7280; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">
            <p style="margin: 0; color: #065f46; font-size: 14px;">
              💡 답장하려면 이 이메일에 직접 답장하시면 됩니다.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: '메시지가 성공적으로 전송되었습니다!', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('이메일 전송 오류:', error);
    return NextResponse.json(
      { error: '메시지 전송에 실패했습니다. 나중에 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
