// src/services/auth.ts
export const fetchToken = async () => {
  const res = await fetch("http://20.244.56.144/evaluation-service/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "your_username", 
      password: "your_password"
    }),
  });

  const data = await res.json();
  localStorage.setItem("authToken", data.token);
  return data.token;
};
