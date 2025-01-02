import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/api/axiosInstance";
import { useUserStore } from "@/zustand/store";

export default function LoginForm() {
  const { setUser } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    type User = {
      _id: string;
      email: string;
      role: string;
    };

    interface LoginResponse {
      success: boolean;
      message: string;
      user: User;
    }

    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/students/login",
        {
          email,
          password,
        }
      );
      toast.toast({
        description: response.data.message,
      });
      const userData = {
        id: response.data.user._id,
        email: response.data.user.email,
        role: response.data.user.role,
      };
      setUser(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.toast({
          description: error.response?.data?.message,
        });
      } else {
        toast.toast({
          description: "Error during login",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}
