import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { put } from '@vercel/blob';

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
  const blob = await put(fileName, file, {
    access: 'public',
  });
  console.log(blob, '内容信息');
  return NextResponse.json({
    msg: '',
    code: 0,
    data: {
      originalURL: blob.url,
      url: blob.url
    }
  }, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}