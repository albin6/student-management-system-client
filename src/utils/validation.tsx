interface StudentData {
  name: string;
  email: string;
  course: string;
  password: string;
}

export const validateForm = (data: Partial<StudentData>) => {
  if (!data.name) {
    return "Name is required.";
  } else if (!/^[A-Za-z\s]+$/.test(data.name)) {
    return "Name should only contain alphabets.";
  }

  if (!data.email) {
    return "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return "Invalid email format.";
  }

  if (!data.course) {
    return "Course is required.";
  } else if (!/^[A-Za-z\s]+$/.test(data.course)) {
    return "Course should only contain alphabets.";
  }
  if (
    data.password?.trim() &&
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
      data.password
    )
  ) {
    return "Password must contain at least one uppercase letter, one special character, one digit, and be at least 6 characters long.";
  }
};
