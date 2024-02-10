import {
  mount,
  flushPromises,
  RouterLinkStub,
  RouterViewStub,
} from '@vue/test-utils';
import Antd from 'ant-design-vue';

import App from '@/App.vue';
import Header from '@/components/common/Header.vue';
import Login from '@/components/header-component/Login.vue';
import { permissionsApi } from '@/api/permissions';
import { noticesApi } from '@/api/notices';
import router from '@/router';
import { claimsApi } from '@/api/claims';
import { aftApi } from '@/api/additional-fields';
import { authApi } from '@/api/auth';

import store from '../store';

jest.mock('axios');

const $socket = {
  on: jest.fn(),
};
const $matchMedia = {
  mobile: false,
};

describe('Home.vue', () => {
  let getPermissionsSpy;
  let loginSpy;
  let wrapper;

  beforeAll(async () => {
    getPermissionsSpy = jest
      .spyOn(permissionsApi, 'getMyPermissions')
      .mockResolvedValue({ success: true, data: [] });

    jest
      .spyOn(noticesApi, 'getNotices')
      .mockResolvedValue({ success: true, data: [] });

    jest
      .spyOn(claimsApi, 'getClaims')
      .mockResolvedValue({ success: true, data: [] });

    jest
      .spyOn(aftApi, 'getAdditionalFields')
      .mockResolvedValue({ success: true, data: [] });

    loginSpy = jest
      .spyOn(authApi, 'login')
      .mockResolvedValue({ success: true, data: { token: 'token' } });

    wrapper = mount(App, {
      global: {
        plugins: [store, Antd, router],
        mocks: {
          $socket,
          $matchMedia,
        },
        stubs: {
          RouterLink: RouterLinkStub,
          RouterView: RouterViewStub,
        },
      },
    });
    await flushPromises();
  });

  it('loads login btn and it works = shows modal correctly', async () => {
    expect(wrapper.findComponent(Header).exists()).toBe(true);

    const loginBtn = wrapper.find('.header__auth__login-btn');
    expect(loginBtn.exists()).toBe(true);
    expect(wrapper.findComponent(Login).exists()).toBe(false);

    await loginBtn.trigger('click');

    expect(wrapper.find('.auth-modal').exists()).toBe(true);

    expect(getPermissionsSpy).toHaveBeenCalledTimes(1);
  });

  it('you can input your values and submit login correctly', async () => {
    expect(wrapper.findComponent(Login).exists()).toBe(true);

    const emailInput = wrapper.find('#email');
    const passwordInput = wrapper.find('#password');
    emailInput.element.value = 'email';
    await emailInput.trigger('input');
    passwordInput.element.value = 'password';
    await passwordInput.trigger('input');

    const submitBtn = wrapper.find('.login__submit-btn');
    await submitBtn.trigger('click');

    expect(loginSpy).toHaveBeenCalledWith({
      email: 'email',
      password: 'password',
    });

    await flushPromises();
    expect(wrapper.findComponent(Login).exists()).toBe(false);
  });
});
