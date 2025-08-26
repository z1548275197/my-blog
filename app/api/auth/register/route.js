import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    
    // 验证必填字段
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: '用户名、邮箱和密码都是必填项' },
        { status: 400 }
      );
    }
    
    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度至少为6位' },
        { status: 400 }
      );
    }
    
    // 检查用户名是否已存在
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username }
    });
    
    if (existingUserByUsername) {
      return NextResponse.json(
        { error: '用户名已存在' },
        { status: 400 }
      );
    }
    
    // 检查邮箱是否已存在
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUserByEmail) {
      return NextResponse.json(
        { error: '邮箱已被注册' },
        { status: 400 }
      );
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // 创建用户
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
      }
    });
    
    return NextResponse.json(
      { 
        message: '注册成功',
        user 
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}