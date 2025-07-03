import api from ".";

export async function loginUser(email: string, password: string) {
  const res = await api.post(`/auth/login`, { email, password });
  return res.data;
}

export async function logoutUser() {
  const res = await api.post(`/auth/logout`);
  return res.data;
}

export const signupUser = async (name:string, email:string, password:string) => {
  const response = await api.post("/auth/signup", { name, email, password });
  return response.data;
};

