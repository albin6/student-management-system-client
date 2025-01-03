import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit, EyeIcon } from "lucide-react";
import { axiosInstance } from "@/api/axiosInstance";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { StudentDetails } from "./StudentDetails";
import { ConfirmationModal } from "@/components/ConfirmationModal";

export function StudentsList() {
  type student = {
    _id: string;
    name: string;
    course: string;
    email: string;
    isActive: boolean;
    enrollmentDate: string;
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [students, setStudents] = useState<student[]>([]);
  const [updated, setUpdated] = useState(false);
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    removeUser(studentId);
    setStudentId("");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  async function fetchUsers() {
    interface StudentsResponse {
      _id: string;
      name: string;
      email: string;
      course: string;
      role: string;
      isActive: boolean;
      enrollmentDate: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }
    interface ApiResponse {
      success: boolean;
      students: StudentsResponse[];
    }
    try {
      const response = await axiosInstance.get<ApiResponse>("/admin/students");
      setStudents(response.data.students);
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
  }

  const toggleUpdate = () => {
    setUpdated(!updated);
  };

  const removeUser = async (stdId: string) => {
    interface ResponseModel {
      success: boolean;
      message: string;
    }
    try {
      const response = await axiosInstance.delete<ResponseModel>(
        `/admin/students/${stdId}`
      );
      toggleUpdate();
      toast({ description: response.data.message });
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

  useEffect(() => {
    fetchUsers();
  }, [updated]);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-6">Students List</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SRN</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Enrollment Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {student.isActive ? "Active" : "Inactive"}
                </TableCell>
                <TableCell className="flex space-x-4">
                  <EyeIcon
                    className="cursor-pointer"
                    onClick={() => {
                      setStudentId(student._id);
                      setEdit(false);
                      setModalOpen(true);
                    }}
                  />
                  <Edit
                    className="cursor-pointer"
                    onClick={() => {
                      setStudentId(student._id);
                      setModalOpen(true);
                      setEdit(true);
                    }}
                  />
                  <Delete
                    className="cursor-pointer"
                    onClick={() => {
                      setStudentId(student._id);
                      setIsModalOpen(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {modalOpen && (
        <div className="w-1/3 absolute top-44 left-1/3 mx-auto bg-white p-6 rounded">
          <StudentDetails
            studentId={studentId}
            closeModal={closeModal}
            isEdit={edit}
            toggleUpdate={toggleUpdate}
          />
        </div>
      )}
      {isModalOpen && (
        <ConfirmationModal
          title="Are you sure?"
          message="This action cannot be undone. Are you sure you want to proceed?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </>
  );
}
