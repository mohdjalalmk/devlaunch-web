import api from ".";

export async function loginUser(email: string, password: string) {
  const res = await api.post(`/auth/login`, { email, password });
  return res.data;
}

export async function logoutUser() {
  const res = await api.post(`/auth/logout`);
  return res.data;
}

export const signupUser = (name: string, email: string, password: string) =>
  api.post("/auth/send-otp", { name, email, password });

export const verifyOtp = (email: string, otp: string) =>
  api.post("/auth/signup/verify-otp", { email, otp });

export const deleteAccountAPI = async () => {
  await api.delete(`/auth/delete`);
};