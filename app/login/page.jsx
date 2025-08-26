"use client";
import { useSetState } from "ahooks";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [state, setState] = useSetState({
    username: "",
    password: "",
    isVisible: false,
    isLoading: false
  });
  const router = useRouter();
  const { login } = useAuth();

  const toggleVisibility = () => setState({ isVisible: !state.isVisible });



  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!state.username || !state.password) {
      toast.error("请输入用户名和密码");
      return;
    }

    setState({ isLoading: true });
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: state.username, password: state.password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("登录成功！");
        // 使用 AuthContext 的 login 方法
        login(data.user);
        
        // 跳转到博客页面
        router.push("/blog");
      } else {
        toast.error(data.message || "登录失败");
      }
    } catch (error) {
      console.error("登录错误:", error);
      toast.error("登录失败，请稍后重试");
    } finally {
      setState({ isLoading: false });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            登录
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            请输入您的账户信息
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="用户名"
            placeholder="请输入用户名"
            value={state.username}
            onChange={(e) => setState({ username: e.target.value })}
            variant="bordered"
            size="lg"
            isRequired
          />
          <Input
            label="密码"
            placeholder="请输入密码"
            type={state.isVisible ? "text" : "password"}
            value={state.password}
            onChange={(e) => setState({ password: e.target.value })}
            variant="bordered"
            size="lg"
            isRequired
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {state.isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-gray-400" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-gray-400" />
                )}
              </button>
            }
          />
          <Button
            type="submit"
            className="w-full"
            color="primary"
            isLoading={state.isLoading}
            size="lg"
            disabled={!state.username || !state.password}
          >
            {state.isLoading ? "登录中..." : "登录"}
          </Button>
        </form>
        
        <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          还没有账号？
          <Button
            variant="light"
            size="sm"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium ml-1"
            onClick={() => router.push("/register")}
          >
            立即注册
          </Button>
        </div>
      </div>
    </div>
  );
}