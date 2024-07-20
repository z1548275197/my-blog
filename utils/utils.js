/**
 * 动态加载 JavaScript 文件
 * @param {string} url - 要加载的 JavaScript 文件的 URL
 * @returns {Promise<void>} - 返回一个 Promise,在文件加载完成时resolve
 */
export const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script ${url}`));
    document.body.appendChild(script);
  });
}

/**
 * 动态加载 CSS 文件
 * @param {string} url - 要加载的 CSS 文件的 URL
 * @returns {Promise<void>} - 返回一个 Promise,在文件加载完成时resolve
 */
export const loadCSS = (url) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS ${url}`));
    document.head.appendChild(link);
  });
}
