"use client";
import { useEffect, useRef, useState } from 'react';
import { loadCSS, loadScript } from '@/utils/utils';
import { Button, Input, CircularProgress } from '@nextui-org/react';
import { saveBlog } from '@/api/post';
import { useSetState } from 'ahooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditPage() {
  const vditorRef = useRef(null);
  const [state, setState] = useSetState({
    title: '',
    content: '',
    isLoad: false
  });

  const resizeImages = () => {
    const content = document.getElementById('content');
    const images = content.querySelectorAll('img');
    images.forEach((img) => {
      img.style.width = '300px'; // 设置图片宽度为300px
    });
  }

  const initEditor = () => {
    var vditor = null;
    vditor = new Vditor(document.getElementById('content'), {
      cache: {
        enable: false
      },
      mode: 'wysiwyg',
      height: '500px',
      toolbarConfig: {
        pin: true,
      },
      upload: {
        url: '/api/post/upload', // 上传url
        accept: 'image/jpeg,image/png,image/gif,image/jpg,image/bmp', // 图片格式
        max: 2 * 1024 * 1024,  // 控制大小
        multiple: false, // 是否允许批量上传
        fieldName: 'file', // 上传字段名称
        filename(name) {
          return name
            .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
            .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '')
            .replace('/\\s/g', '');
        },
        // 数据转换
        format(files, responseText) {
          const res = JSON.parse(responseText);
          const name = files[0].name;
          const url = res.data.url;
          const result = JSON.stringify({
            code: 0,
            data: { errFiles: '', succMap: { [name]: url } },
          });
          setTimeout(() => {
            resizeImages();
          }, 100);
          return result;
        },
      },
      toolbar: ['emoji', 'br', 'bold', 'line', 'headings', 'italic', 'strike', 'quote', 'list',
        'code', 'insert-after', 'undo', 'link', 'table', 'help', 'upload'],
      after: () => {
        //         vditor.setValue(`
        // # Welcome to Vditor WYSIWYG Example

        // This is a **WYSIWYG** (What You See Is What You Get) example using the Vditor editor.

        // In this mode, you can directly edit the content in the editor area, without needing to know Markdown syntax.

        // Try typing or formatting the text, and you'll see the changes reflected in real-time.

        // Enjoy using Vditor's WYSIWYG mode!
        //         `);
        console.log('加载完成了')
        setState({
          isLoad: true
        });
      },
    });
    vditorRef.current = vditor;
  }

  const loadSource = () => {
    Promise.all([
      loadScript('https://unpkg.com/vditor/dist/index.min.js'),
      loadCSS('https://unpkg.com/vditor/dist/index.css')
    ])
      .then(() => {
        console.log('All resources loaded successfully!');
        // 在这里可以执行加载完成后的操作
        initEditor();
      })
      .catch((error) => {
        console.error('Error loading resources:', error);
      });
  }

  const saveContent = async () => {
    const markdownContent = vditorRef.current.getValue();
    if (!state.title) {
      toast.warn('请输入标题!', {
        hideProgressBar: true,
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    if (!markdownContent) {
      toast.warn('请输入文章内容!', {
        hideProgressBar: true,
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const response = await fetch('/api/post/save', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: state.title,
        content: markdownContent,
        author: 'test_user1'
      })
    });
    console.log(response, '这是我的数据')
    if (response) {
      toast.success('操作成功!', {
        hideProgressBar: true,
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        window.location.href = '/blog';
      }, 3000);
    }
  }


  useEffect(() => {
    loadSource();
  }, []);

  return (
    <div>
      {
        state.isLoad && (
          <Input className='mb-2' size='sm' type="email" label="标题" placeholder="请输入文章标题" onValueChange={(val) => {
            setState({
              title: val
            })
          }} />
        )
      }
      <div className='h-400 mt-100' id='content'></div>
      {
        state.isLoad && (
          <Button className='mt-2' size="sm" color="secondary" onClick={saveContent}>保存</Button>
        )
      }
      {
        !state.isLoad && (
          <div className='text-center mt-6 w-full flex justify-center'>
            <CircularProgress
              classNames={{
                svg: "w-48 h-48",
              }}
              color="secondary"
              label={<div className='text-secondary' id='content'>loading...</div>}
            />
          </div>
        )
      }
      <ToastContainer></ToastContainer>
    </div>
  )
}