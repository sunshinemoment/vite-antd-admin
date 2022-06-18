import { post } from '@/utils/http';

/**
 *  获账号户列表
 */
export const login = (data) => {
  console.log('/user/login request ->>', data);
  return post('/user/login', data);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     // resolve({
  //     //   token: 'xxx token',
  //     // });
  //     reject({ code: 400, message: 'Incorrect account password' });
  //   }, 500);
  // });
};
