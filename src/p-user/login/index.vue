<script setup>
import { useRouter, useRoute } from 'vue-router';
import { login } from '@/apis/user';
import { useRequest } from 'vue-request';
import { localStore } from '@/utils/store';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const {
  loading: loginLoading,
  run: loginRun,
  error: loginError,
} = useRequest(login, {
  manual: true,
});

const formState = reactive({
  username: '',
  password: '',
});

async function finish(values) {
  const res = await loginRun({
    username: values.username,
    password: values.password,
  });
  if (loginError.value) return;
  localStore.set('token', res.token);
  if (route.query.redirect) {
    router.push(route.query.redirect);
    return;
  }
  router.push('/');
}

const finishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
</script>

<template>
  <div class="page-login">
    <div class="login-head">
      <h2>用户登录</h2>
      <b>Login User</b>
    </div>
    <a-divider>
      <span class="login-desc">欢迎登录 XXX模板 管理系统</span>
    </a-divider>
    <a-form
      @finish="finish"
      @finishFailed="finishFailed"
      :model="formState"
      autocomplete="off"
      labelAlign="left"
    >
      <a-form-item name="username" :rules="[{ required: true, message: '用户名不能为空' }]">
        <a-input v-model:value="formState.username" placeholder="请输入用户名">
          <template #prefix> <UserOutlined /> </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" :rules="[{ required: true, message: '密码不能为空' }]">
        <a-input-password v-model:value="formState.password" placeholder="请输入密码">
          <template #prefix> <LockOutlined /> </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button block type="primary" html-type="submit" :loading="loginLoading">
          进入系统
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style lang="scss" scoped>
.page-login {
  .login-head {
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  h2 {
    margin-right: 4px;
    margin-bottom: 0;
    color: #1890ff;
    font-weight: bold;
  }

  b {
    margin-bottom: 2px;
    color: #999;
    font-size: 16px;
  }

  .login-desc {
    color: #888;
  }
}
</style>
