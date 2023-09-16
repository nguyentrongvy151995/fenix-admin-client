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
    return http.post<any>(RANK_SETTING, data);
  },
  putRankSettings(id: string, data: any) {
    return http.put<any>(RANK_SETTING + '/' + id, data);
  },
  getRankSetting(id: string) {
    return http.get<any>(RANK_SETTING + '/' + id);
  },
  deleteRankSetting(id: string) {
    return http.delete<any>(RANK_SETTING + '/' + id);
  },
};

export default rankSettingApi
