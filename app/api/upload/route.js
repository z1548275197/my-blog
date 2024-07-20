import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  console.log(file)
  if (!file) {
    return NextResponse.json({
      code: -1,
      msg: '文件上传失败'
    })
  }

  const fileName = file.name;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadPath = path.join(process.cwd(), 'public/uploads', `${Date.now()}-${fileName}`);
  return NextResponse.json({
    msg: '',
    code: 0,
    data: {
      originalURL: 'https://fr-static.jiazhengye.cn/noData.15766a76aac53343.png',
      url: 'https://fr-static.jiazhengye.cn/noData.15766a76aac53343.png'
    }
  }, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}