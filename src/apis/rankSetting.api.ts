import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'
const RANK_SETTING = 'rank-setting'

const rankSettingApi = {
  getRankSettings(currentPage: number = 1) {
    return http.get<any>(RANK_SETTING + '?page=' + currentPage);
  },
  postRankSettings(data: any) {
    console.log('data', data)
    return http.post<any>(RANK_SETTING, data);
  },
};

export default rankSettingApi
