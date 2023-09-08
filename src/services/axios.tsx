import axios, { AxiosRequestConfig } from 'axios'

export const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:8080',
  responseType: 'json',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
  timeout: 100000,
  withCredentials: false,
  maxRedirects: 5,
  validateStatus: (status: number) => status >= 200 && status < 300,
  transformResponse: (response) => {
    if (response !== null && response.error) {
      console.log(response.error);
    }
    let resp;
    try {
      resp = JSON.parse(response);
    } catch {
      resp = response;
    }
    return resp;
  },
};

export const login = async (user: any) => {
  config.url = 'login'
  config.method = 'post'
  config.data = user
  return axios.request<any>(config);
};

export const load = async () => {
  config.url = 'visitant'
  config.method = 'get'
  return axios.request<any>(config);
};

export const creat = async (userName: any) => {
  config.url = 'creat'
  config.method = 'post'
  config.data = { nomeUser: userName }
  return axios.request<any>(config);
};

export const signup = async (user: any) => {
  config.url = 'signup'
  config.method = 'post'
  config.data = user
  return axios.request<any>(config);
}

export const loadUserResident = async (idResident: number) => {
  config.url = `/load/user/resident/${idResident}`
  config.method = 'get'
  config.params = idResident
  return axios.request<any>(config)
}

export const creatVisitantResident = async (user: any) => {
  config.url = `/visitant`
  config.method = 'post'
  config.data = user
  return axios.request<any>(config);
}

export const creatImg = async (user: any) => {
  config.url = `/img`
  config.method = 'post'
  config.data = user
  return axios.request<any>(config);
}

export const updateUserResident = async (user: any, idUser: number) => {
  config.url = `/update/user/${idUser}`
  config.method = 'put'
  config.params = idUser
  config.data = user
  return axios.request<any>(config);
}

export const updateVisitant = async (user: any, idUser: number) => {
  config.url = `/update/user/visitant/${idUser}`
  config.method = 'put'
  config.params = idUser
  config.data = user
  return axios.request<any>(config);
}

export const deleteUserResident = async (idUser: number) => {
  config.url = `/user/${idUser}`
  config.method = 'delete'
  config.params = idUser
  return axios.request<any>(config);
}

export const deleteUser = async (name: string) => {
  config.url = `/visitant/${name}`
  config.method = 'delete'
  config.params = name
  return axios.request<any>(config);
}