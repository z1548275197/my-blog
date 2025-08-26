'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Chip } from '@nextui-org/react';
import { ArrowLeftIcon, EditIcon, DeleteIcon } from '@/components/icons';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { marked } from 'marked';

export default function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { id } = params;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/post/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('博客不存在');
          } else {
            setError('获取博客失败');
          }
          return;
        }
        
        const blogData = await response.json();
        setBlog(blogData);
      } catch (error) {
        console.error('获取博客详情失败:', error);
        setError('网络错误，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleBack = () => {
    router.push('/blog');
  };

  const handleEdit = () => {
    router.push(`/blog/edit?id=${id}`);
  };

  const handleDelete = async () => {
    if (!confirm('确定要删除这篇博客吗？此操作不可恢复。')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('博客删除成功');
        router.push('/blog');
      } else {
        const data = await response.json();
        toast.error(data.error || '删除失败');
      }
    } catch (error) {
      console.error('删除博客失败:', error);
      toast.error('删除时发生错误');
    } finally {
      setDeleting(false);
    }
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

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button color="primary" onClick={handleBack}>
            返回博客列表
          </Button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">博客不存在</p>
          <Button color="primary" onClick={handleBack}>
            返回博客列表
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* 顶部操作栏 */}
      <div className="mb-6 flex justify-between items-center">
        <Button 
          variant="light" 
          startContent={<ArrowLeftIcon />}
          onClick={handleBack}
          className="text-default-500 hover:text-default-700"
        >
          返回博客列表
        </Button>
        
        {/* 编辑和删除按钮 - 仅登录用户可见 */}
        {isAuthenticated && (
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="flat"
              startContent={<EditIcon />}
              onClick={handleEdit}
            >
              编辑
            </Button>
            <Button
              color="danger"
              variant="flat"
              startContent={<DeleteIcon />}
              onClick={handleDelete}
              isLoading={deleting}
            >
              {deleting ? '删除中...' : '删除'}
            </Button>
          </div>
        )}
      </div>

      {/* 博客内容 */}
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex flex-col w-full">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center gap-4 text-small text-default-500">
              <Chip variant="flat" color="primary" size="sm">
                {blog.author}
              </Chip>
              <span>发布于 {dayjs(blog.createdAt).format('YYYY年MM月DD日 HH:mm')}</span>
              {blog.updatedAt !== blog.createdAt && (
                <span>更新于 {dayjs(blog.updatedAt).format('YYYY年MM月DD日 HH:mm')}</span>
              )}
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="py-6">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: marked(blog.content) }}
          />
        </CardBody>
      </Card>
    </div>
  );
}

