import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
const URL_TODO = 'todos'

const toDoApi = {
  getListTodo() {
    return http.get<any>(URL_TODO)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  }
}

export default toDoApi
