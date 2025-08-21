// app/page.tsx
import { title, subtitle } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter, Divider, Avatar, Button } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect } from "react";

export default async function Blog() {
  const blogs = [];

  const _getBlogList = async () => {
    const res = await fetch('/api/post/save', {
      method: 'get',
    });
    console.log(res, '博客列表')
  }

  useEffect(() => {
    _getBlogList()
  }, [])

  return (
    <div className="h-screen">
      <div className="mb-2">
        <Button color="primary">新建博客</Button>
      </div>
      {
        blogs.map((item) => {
          return (
            <Card className="w-full" key={item.id}>
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">{item.title}</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>{item.content}</p>
              </CardBody>
              <Divider />
              <CardFooter>
                <p className="text-small text-default-500">{item.author}</p>
              </CardFooter>
            </Card>
          )
        })
      }
    </div>
  )

}

