import http from '@/utils/http';

/**
 *  获账号户列表
 */
export const login = (data) => {
  console.log('/user/login request ->>', data);
  return http({ url: '/user/login', method: 'POST', data });
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     // resolve({
  //     //   token: 'xxx token',
  //     // });
  //     reject(new Error('login error'));
  //   }, 500);
  // });
};
