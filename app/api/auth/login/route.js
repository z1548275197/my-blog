import { NextResponse } from "next/server";
import { prisma } from "@/api/post";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // 验证输入
    if (!username || !password) {
      return NextResponse.json(
        { message: "用户名和密码不能为空" },
        { status: 400 }
      );
    }

    // 查找用户
    const user = await prisma.User.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "用户名或密码错误" },
        { status: 401 }
      );
    }

    // 验证密码（这里简化处理，实际项目中应该使用加密密码）
    if (user.password !== password) {
      return NextResponse.json(
        { message: "用户名或密码错误" },
        { status: 401 }
      );
    }

    // 登录成功，返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      {
        message: "登录成功",
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("登录错误:", error);
    return NextResponse.json(
      { message: "服务器内部错误" },
      { status: 500 }
    );
  }
}