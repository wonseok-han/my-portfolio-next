'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Contact Form (Client Component)
 * 폼 제출 로직만 클라이언트에서 처리
 */
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }

    setTimeout(() => {
      toast.success('메시지가 성공적으로 전송되었습니다!');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>메시지 보내기</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="홍길동"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="hong@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">메시지</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="프로젝트나 협업에 대해 자세히 알려주세요..."
              rows={5}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600"
          >
            <Send size={18} className="mr-2" />
            메시지 보내기
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
