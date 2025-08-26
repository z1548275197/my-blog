"use client";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import NextLink from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("请填写所有字段");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("两次输入的密码不一致");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("密码长度至少为6位");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success("注册成功！请登录");
        router.push('/login');
      } else {
        toast.error(data.error || "注册失败");
      }
    } catch (error) {
      console.error('注册错误:', error);
      toast.error("注册时发生错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-col gap-3 pb-6">
          <h1 className="text-2xl font-bold text-center">用户注册</h1>
          <p className="text-small text-default-500 text-center">
            创建您的账户
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="用户名"
              placeholder="请输入用户名"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              isRequired
              variant="bordered"
            />
            
            <Input
              label="邮箱"
              placeholder="请输入邮箱"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              isRequired
              variant="bordered"
            />
            
            <Input
              label="密码"
              placeholder="请输入密码（至少6位）"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              isRequired
              variant="bordered"
            />
            
            <Input
              label="确认密码"
              placeholder="请再次输入密码"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              isRequired
              variant="bordered"
            />
            
            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full"
              isLoading={loading}
            >
              {loading ? "注册中..." : "注册"}
            </Button>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-small text-default-500">
              已有账户？{" "}
              <NextLink href="/login" className="text-primary hover:underline">
                立即登录
              </NextLink>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}