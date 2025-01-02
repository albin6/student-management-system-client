import { axiosInstance } from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/zustand/store";
import axios from "axios";
import { useState } from "react";
import { StudentDetails } from "./admin/StudentDetails";

export default function Dashboard() {
  const { toast } = useToast();
  const { clearUser, user } = useUserStore();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const handleLogout = async () => {
    // In a real app, you would clear the authentication state here
    try {
      await axiosInstance.post("/students/logout");
      clearUser();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({ description: error.response?.data?.message });
      } else {
        toast({ description: "An error occured" });
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the Student Management System
      </h1>
      <p className="mb-4">This is your dashboard. More features coming soon!</p>
      <div className="flex space-x-9">
        <Button onClick={() => setEditModalOpen(true)}>Edit Details</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      {editModalOpen && user && (
        <div className="absolute w-1/4 mx-auto bg-white p-6 rounded">
          <StudentDetails
            studentId={user.id}
            closeModal={closeModal}
            isEdit={true}
          />
        </div>
      )}
    </div>
  );
}
