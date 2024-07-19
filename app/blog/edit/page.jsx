"use client";
import { useEffect } from 'react';


export default function EditPage() {

  function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
  }

  function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }


  useEffect(() => {
    console.log('出发nei')
    loadScript('https://unpkg.com/vditor/dist/index.min.js');
    loadCSS('https://unpkg.com/vditor/dist/index.css');
    setTimeout(() => {
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
        after: () => {
          vditor.setValue(`
# Welcome to Vditor WYSIWYG Example

This is a **WYSIWYG** (What You See Is What You Get) example using the Vditor editor.

In this mode, you can directly edit the content in the editor area, without needing to know Markdown syntax.

Try typing or formatting the text, and you'll see the changes reflected in real-time.

Enjoy using Vditor's WYSIWYG mode!
        `);
        },
      });
      console.log(vditor, 'vditor')
    }, 3000)
  }, [])

  return (
    <div>
      我是编辑页面
      <div className='h-400' id='content'></div>
    </div>
  )
}