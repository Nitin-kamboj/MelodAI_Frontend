
export async function RefreshToken(){
    // const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const API_BASE = import.meta.env.VITE_HTTP;
    if(!refreshToken){
        throw new Error("Token not Found!");
    }

    const response = await fetch(`${API_BASE}/api/user/refresh`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    })

    if(!response.ok){
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        throw new Error("Error generatiung the refresh Token");
    }

    const data = await response.json();

    const new_token = data.accessToken;
    localStorage.setItem("token", new_token);
    if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }
  return data.accessToken;
}