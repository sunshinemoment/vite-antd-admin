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
    return Promise.reject({
      code: data.code,
      message: data.message,
    });
  },
  ({ response, ...responseData }) => {
    if (!response) {
      return Promise.reject({
        code: responseData.code,
        message: responseData.message,
      });
    }
    if (response.data) {
      return Promise.reject({
        code: response.data.code,
        message: response.data.message || 'server error',
      });
    }
    return Promise.reject({
      code: response.status,
      message: response.statusText || 'server error',
    });
  },
);

const http = async (options = {}) => {
  const { headers = {}, method = 'GET', url = '/', data, params } = options;

  try {
    const res = await axiosInstance.request({
      method,
      url,
      headers,
      data,
      params,
    });
    return res;
  } catch (error) {
    message.error(error.message);
    if (error.code === UNAUTHORIZED) {
      localStore.clearAll();
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
    // throw new Error(error);
    Promise.reject(error);
    // return [error, null];
  }
};

export default http;
