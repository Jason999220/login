import axios from "axios";

// 設定進入 登入/註冊 的網址
const API_URL = "http://localhost:8000/auth";

// 設定class method
class AuthService {
  // handle Register
  register(email: string, username: string, password: string) {
    return axios.post(API_URL + "/register", {
      email,
      username,
      password,
    });
  }
  // handle login
  login(email: string, password: string) {
    return axios.post(API_URL + "/login", {
      email,
      password,
    });
  }

  // handle logout
  logout() {
    localStorage.removeItem("user");
  }

  // handle current user
  getCurrentUser() {
    return axios.post(API_URL + "/getCurrentUser");
  }
}

// why add new
export default new AuthService();
