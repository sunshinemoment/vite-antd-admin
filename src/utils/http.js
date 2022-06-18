import axios from 'axios';
import { message } from 'ant-design-vue';
import { localStore } from '@/utils/store';
import { SUCCESS, UNAUTHORIZED } from '@/constants/http-code';

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_BASEURL,
  timeout: 50000,
});

/**
 * 请求拦截
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      const formData = new FormData();
      for (let k in config.data || {}) {
        if (Object.prototype.hasOwnProperty.call(config.data, k)) {
          formData.append(k, config.data[k]);
        }
      }
      config.data = formData;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 响应拦截
 */
axiosInstance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code === SUCCESS) {
      return data.data;
    }
    message.error(data.message);
    if (data.code === UNAUTHORIZED) {
      localStore.clearAll();
      setTimeout(() => {
        location.reload();
      }, 3000);
      return Promise.reject({
        code: data.code,
        message: data.message,
      });
    }
    return Promise.reject({
      code: data.code,
      message: data.message,
    });
  },
  ({ response, ...responseData }) => {
    let errorData = {
      code: response.status,
      message: response.statusText || 'server error',
    };
    if (!response) {
      // 超时或者其他不知名情况下会进入这里
      errorData = {
        code: responseData.code,
        message: responseData.message,
      };
    } else if (response.data) {
      errorData = {
        code: response.data.code,
        message: response.data.message || 'server error',
      };
    }
    return Promise.reject(errorData);
  },
);

const http = async ({ headers = {}, method = 'GET', url = '/', data, params } = {}) => {
  return await axiosInstance.request({
    method,
    url,
    headers,
    data,
    params,
  });
};

export const get = async (url, params, config) => {
  return await http({ url, method: 'GET', params, ...config });
};

export const post = async (url, data, config) => {
  return await http({ url, method: 'POST', data, ...config });
};

export const del = async (url, params, config) => {
  return await http({ url, method: 'delete', params, ...config });
};

export const put = async (url, data, config) => {
  return await http({ url, method: 'put', data, ...config });
};

export default http;
