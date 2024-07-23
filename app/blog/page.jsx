// app/page.tsx
import { title, subtitle } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter, Divider, Avatar, Button } from '@nextui-org/react';
import { getAllBlogs } from '@/api/post';
import NextLink from "next/link";
import dayjs from 'dayjs';

export default async function Blog() {

  const blogs = await getAllBlogs();

  return (
    <div className="h-screen">
      <div className="mb-2">
        <NextLink href='/blog/edit'>
          <Button color="primary">
            新建博客
          </Button>
        </NextLink>
      </div>

      {
        blogs.map((item) => {
          return (
            <Card className="w-full mb-4" key={item.id}>
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
    </div >
  )
}

