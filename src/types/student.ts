export interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  status: "active" | "blocked";
}
