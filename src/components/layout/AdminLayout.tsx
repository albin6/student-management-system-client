import { Link, Outlet } from "react-router-dom";
import { Button } from "../ui/button";
import { useAdminStore } from "@/zustand/adminStore";
import { useToast } from "@/hooks/use-toast";
import { axiosInstance } from "@/api/axiosInstance";
import axios from "axios";

export function AdminLayout() {
  const { toast } = useToast();
  const { clearAdmin } = useAdminStore();
  const logout = async () => {
    interface ResponseModel {
      success: boolean;
      message: string;
    }
    try {
      const response = await axiosInstance.post<ResponseModel>("/admin/logout");
      toast({ description: response.data.message });
      clearAdmin();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({ description: error.response?.data?.message });
      } else {
        toast({ description: "An error occured" });
      }
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5 space-y-5 flex flex-col items-center">
          <Link
            to="/admin"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/students"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Students
          </Link>
          <Link
            to="/admin/students/new"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200"
          >
            Add Student
          </Link>
          <Button
            onClick={logout}
            className="block py-2 px-10 hover:bg-gray-200"
          >
            Logout
          </Button>
        </nav>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
