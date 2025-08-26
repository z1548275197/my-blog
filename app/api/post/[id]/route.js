import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // 根据ID获取单篇博客
    const post = await prisma.post.findUnique({
      where: {
        id: id
      }
    });

    if (!post) {
      return NextResponse.json(
        { error: '博客不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('获取博客详情失败:', error);
    return NextResponse.json(
      { error: '获取博客详情失败' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// 删除博客
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // 验证博客ID
    if (!id) {
      return NextResponse.json(
        { error: '博客ID不能为空' },
        { status: 400 }
      );
    }

    // 检查博客是否存在
    const existingBlog = await prisma.post.findUnique({
      where: { id: id }
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: '博客不存在' },
        { status: 404 }
      );
    }

    // 删除博客
    await prisma.post.delete({
      where: { id: id }
    });

    return NextResponse.json(
      { message: '博客删除成功' },
      { status: 200 }
    );
  } catch (error) {
    console.error('删除博客失败:', error);
    return NextResponse.json(
      { error: '删除博客时发生错误' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}