import axios from "axios";
import { User } from "../model/User";
import { baseUrl, getApiService } from "./BaseApiService";

export const login = async (body: User.Login) => {
  const params = new URLSearchParams()
  params.append('username', body.username)
  params.append('password', body.password)
  params.append('__tenant', body.tenant);
  params.append('grant_type', 'password')
  params.append('scope', 'offline_access Scool')
  params.append('client_id', 'Scool_App')
  params.append('client_secret', '1q2w3e*')

  const ins = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
 
  return ins.post('/connect/token', params)
};

export const getRoleUser = async () => {
  const endpoint = 'api/abp/application-configuration'
  const axios = await getApiService()
  return axios.get(endpoint)
}
