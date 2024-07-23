import { NextRequest, NextResponse } from 'next/server';
import { saveBlog } from '@/api/post';

export async function POST(req) {
  let resObj = null;
  const res = await req.json();
  const ret = await saveBlog(res);
  console.log(ret, '我的内容')
  if (!ret) {
    resObj = {
      code: 1,
      msg: '服务端错误',
      data: null
    };
  } else {
    resObj = {
      code: 0,
      msg: '',
      data: ret
    };
  };
  return NextResponse.json({ resObj }, {
    status: 200,
  })
}