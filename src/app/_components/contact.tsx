'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ContactProps {
  user?: UserProps;
}

/**
 * Contact 섹션 컴포넌트
 * 연락처 정보와 메시지 폼을 제공합니다
 */
const Contact = ({ user }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: 'Email',
      value: user?.email || 'hello@example.com',
      link: `mailto:${user?.email || 'hello@example.com'}`,
    },
    {
      icon: <MapPin size={20} />,
      title: 'Location',
      value: user?.address || 'Seoul, South Korea',
      link: null,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('모든 필드를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('메시지가 성공적으로 전송되었습니다!', {
          position: 'bottom-right',
          richColors: true,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(data.error || '메시지 전송에 실패했습니다.', {
          position: 'bottom-right',
          richColors: true,
        });
      }
    } catch (error) {
      console.error('전송 오류:', error);
      toast.error('메시지 전송 중 오류가 발생했습니다.', {
        position: 'bottom-right',
        richColors: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">연락하기</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면 언제든
            연락주세요
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-6">연락처 정보</h3>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.title}
                    variants={itemVariants}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-card hover:bg-card/80 transition-colors"
                  >
                    <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{info.title}</h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">
                          {info.value}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">빠른 응답</h4>
                  <p className="text-muted-foreground text-sm">
                    보통 24시간 이내에 응답드리며, 긴급한 경우 이메일로
                    연락주시면 더 빠르게 도움드릴 수 있습니다.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="bg-card/50 md:backdrop-blur-sm">
              <CardHeader className="px-3 pt-3">
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
                      placeholder="성명을 입력해주세요. (예:홍길동)"
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
                      placeholder="회신받을 이메일을 입력해주세요. (예: hong@example.com)"
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
                      placeholder="문의사항을 입력해주세요...😊"
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} className="mr-2" />
                    {isSubmitting ? '전송 중...' : '메시지 보내기'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
