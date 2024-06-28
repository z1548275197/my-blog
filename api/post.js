import { PrismaClient } from '@prisma/client'
const globalForPrisma = global;

export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getAllBlogs() {
  // const session = await auth()
  // if (session == null) return [];
  // 查找登录用户的笔记
  const posts = await prisma.Post.findMany({
    // where: {
    //   authorId: session?.user?.userId
    // }
  })
  console.log(posts, '查到的笔记');
  // 构造返回数据
  return posts
}
