import http from '@/utils/http';

/**
 *  获账号户列表
 */
export const getUserList = (data) => {
  return http({ data, url: '/user/list' });
};
