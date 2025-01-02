import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/api/axiosInstance";
import axios from "axios";
import { validateForm } from "@/utils/validation";

export function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = validateForm({ name, email, course, password });
    if (validationResult) {
      toast({ description: validationResult });
      return;
    }

    interface AddStudentResponse {
      success: boolean;
      message: string;
    }

    try {
      const response = await axiosInstance.post<AddStudentResponse>(
        "/students/register",
        {
          name,
          email,
          course,
          password,
        }
      );
      toast({
        description: response.data.message,
      });
      setName("");
      setEmail("");
      setPassword("");
      setCourse("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          description: error.response?.data?.message,
        });
      } else {
        toast({
          description: "An unknown error occurred.",
        });
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Student</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="course">Course</Label>
          <Input
            id="course"
            name="course"
            placeholder="Enter Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Add Student</Button>
      </form>
    </div>
  );
}
