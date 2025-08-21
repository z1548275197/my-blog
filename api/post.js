import { PrismaClient } from '@prisma/client'
const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// 博客内容列表
export async function getAllBlogs() {
  // const session = await auth()
  // if (session == null) return [];
  // 查找登录用户的笔记，按创建时间倒序排列
  const posts = await prisma.Post.findMany({
    // where: {
    //   authorId: session?.user?.userId
    // }
    orderBy: {
      createdAt: 'desc'
    }
  })
  console.log(posts, '查到的笔记');
  // 构造返回数据
  return posts
}

export async function saveBlog(query) {
  try {
    const post = await prisma.Post.create({
      data: query,
    });
    return post;
  } catch (err) {
    return false;
  }
}
