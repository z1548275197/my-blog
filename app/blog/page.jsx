"use client";
import { useState, useEffect, useCallback } from "react";
import { title, subtitle } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter, Divider, Avatar, Button } from '@nextui-org/react';
import { Spinner } from "@nextui-org/spinner";
// 移除直接导入，改为通过 API 调用
import NextLink from "next/link";
import dayjs from 'dayjs';
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { marked } from 'marked';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // 获取博客列表
  const fetchBlogs = async (page = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      const response = await fetch(`/api/posts?page=${page}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        
        if (append) {
          setBlogs(prev => [...prev, ...data.posts]);
        } else {
          setBlogs(data.posts);
        }
        
        setCurrentPage(data.pagination.page);
        setHasNextPage(data.pagination.hasNext);
        setTotalPages(data.pagination.totalPages);
      } else {
        console.error('获取博客列表失败');
        toast.error('获取博客列表失败');
      }
    } catch (error) {
      console.error('获取博客列表时出错:', error);
      toast.error('获取博客列表时出错');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // 加载更多数据
  const loadMore = useCallback(() => {
    if (hasNextPage && !loadingMore) {
      fetchBlogs(currentPage + 1, true);
    }
  }, [hasNextPage, loadingMore, currentPage]);

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleNewBlog = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    router.push("/blog/edit");
  };

  // 从 Markdown 内容中提取第一张图片
  const extractFirstImage = (markdownContent) => {
    const htmlContent = marked(markdownContent);
    const imgRegex = /<img[^>]+src="([^"]+)"/;
    const match = htmlContent.match(imgRegex);
    return match ? match[1] : null;
  };

  // 获取纯文本内容（去除 Markdown 语法）
  const getPlainText = (markdownContent) => {
    const htmlContent = marked(markdownContent);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <div className="mb-2">
        <Button color="secondary" onClick={handleNewBlog}>
          新建博客
        </Button>
      </div>

      {
        blogs.map((item) => {
          return (
            <Card className="w-full mb-4 hover:shadow-lg transition-shadow cursor-pointer" key={item.id}>
              <CardHeader className="flex gap-3">
                <div className="flex flex-col w-full">
                  <NextLink href={`/blog/${item.id}`} className="hover:text-primary transition-colors">
                    <p className="text-md font-semibold">{item.title}</p>
                  </NextLink>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                {/* 图片展示 */}
                {extractFirstImage(item.content) && (
                  <div className="mb-3">
                    <img 
                      src={extractFirstImage(item.content)} 
                      alt="博客图片" 
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                {/* 内容预览，限制三行 */}
                <p className="text-default-600 line-clamp-3">
                  {getPlainText(item.content)}
                </p>
              </CardBody>
              <Divider />
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <p className="text-small text-default-500">{item.author}</p>
                  <span className="text-small text-default-400">•</span>
                  <p className="text-small text-default-400">
                    {dayjs(item.createdAt).format('MM月DD日')}
                  </p>
                </div>
                <NextLink href={`/blog/${item.id}`}>
                  <Button size="sm" variant="light" color="primary">
                    阅读全文
                  </Button>
                </NextLink>
              </CardFooter>
            </Card>
          )
        })
      }
      {/* 加载更多指示器 */}
      {loadingMore && (
        <div className="flex justify-center py-4">
          <Spinner size="md" />
        </div>
      )}
      
      {/* 没有更多数据提示 */}
      {!hasNextPage && blogs.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          没有更多博客了
        </div>
      )}
    </div >
  )
}

