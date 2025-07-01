import api from ".";

export async function loginUser(email: string, password: string) {
  const res = await api.post(`/auth/login`, { email, password });
  return res.data;
}

export async function logoutUser() {
  const res = await api.post(`/auth/logout`);
  return res.data;
}
