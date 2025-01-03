import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/api/axiosInstance";
import { X } from "lucide-react";
import { validateForm } from "@/utils/validation";

interface StudentIdProps {
  studentId: string;
  closeModal: () => void;
  isEdit: boolean;
  toggleUpdate: () => void;
}

export function StudentDetails({
  studentId,
  closeModal,
  isEdit,
  toggleUpdate,
}: StudentIdProps) {
  const { toast } = useToast();
  const [student, setStudent] = useState({
    _id: "",
    name: "",
    email: "",
    course: "",
    password: "",
  });

  const fetchStudentDetails = async () => {
    type Student = {
      _id: string;
      name: string;
      email: string;
      course: string;
      password: string;
    };
    interface ResponseModel {
      success: boolean;
      student: Student;
    }
    try {
      const response = await axiosInstance.get<ResponseModel>(
        `/students/${studentId}`
      );
      setStudent(() => response.data.student);
      setStudent((prev) => ({
        ...prev,
        password: "",
      }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({ description: error.message });
      } else {
        toast({ description: "An Error Occured." });
      }
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    interface ResponseModel {
      success: boolean;
      message: string;
    }
    const studentData = student;
    const validationResult = validateForm(studentData);
    if (validationResult) {
      toast({ description: validationResult });
      return;
    }
    try {
      const response = await axiosInstance.put<ResponseModel>(
        `/students/profile/${studentId}`,
        {
          studentData,
        }
      );
      toast({ description: response.data.message });
      toggleUpdate();
      closeModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({ description: error.message });
      } else {
        toast({ description: "An Error Occured." });
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex justify-between items-center">
        Student Details
        <X onClick={closeModal} className="cursor-pointer" />
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-full">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={student.name}
            disabled={!isEdit}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            disabled={!isEdit}
            type="email"
            value={student.email}
          />
        </div>
        <div>
          <Label htmlFor="course">Course</Label>
          <Input
            id="course"
            name="course"
            value={student.course}
            disabled={!isEdit}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            disabled={!isEdit}
            value={student.password}
            onChange={handleInputChange}
          />
        </div>
        <Button disabled={!isEdit} type="submit">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
