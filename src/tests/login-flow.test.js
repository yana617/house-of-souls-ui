import {
  mount,
  flushPromises,
  RouterLinkStub,
  RouterViewStub,
} from '@vue/test-utils';
import axios from 'axios';

import App from '@/App.vue';
import Header from '@/components/common/Header.vue';
import Login from '@/components/header-component/Login.vue';

import store from '../store';

jest.mock('axios');

const $socket = {
  on: jest.fn(),
};
const $matchMedia = {
  mobile: false,
};
const $router = {
  push: jest.fn(),
};

describe('Home.vue', () => {
  let wrapper;

  beforeAll(async () => {
    axios.get.mockResolvedValueOnce({ data: { success: true, permissions: [] } });
    wrapper = mount(App, {
      global: {
        plugins: [store],
        mocks: {
          $socket,
          $matchMedia,
          $router,
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
    axios.get.mockResolvedValueOnce({ data: { success: true, permissions: [] } });
    expect(wrapper.findComponent(Header).exists()).toBe(true);

    const loginBtn = wrapper.find('.header__auth__login-btn');
    expect(loginBtn.exists()).toBe(true);
    expect(wrapper.findComponent(Login).exists()).toBe(false);

    await loginBtn.trigger('click');

    expect(wrapper.find('.auth-modal').exists()).toBe(true);
  });

  it('you can input your values and submit login correctly', async () => {
    axios.get.mockResolvedValueOnce({ data: { success: true, permissions: [] } });
    expect(wrapper.findComponent(Login).exists()).toBe(true);

    const emailInput = wrapper.find('#email');
    const passwordInput = wrapper.find('#password');
    emailInput.element.value = 'email';
    await emailInput.trigger('input');
    passwordInput.element.value = 'password';
    await passwordInput.trigger('input');

    const submitFunction = jest.fn()
      .mockImplementation(() => Promise.resolve({ data: { success: true } }));
    jest.spyOn(axios, 'post').mockImplementationOnce(submitFunction);
    jest.spyOn(axios, 'get')
      .mockImplementationOnce(() => Promise.resolve([]))
      .mockImplementationOnce(() => Promise.resolve({ data: [] }));

    const submitBtn = wrapper.find('.login__submit-btn');
    await submitBtn.trigger('click');

    expect(submitFunction).toHaveBeenCalledWith(expect.any(String), { email: 'email', password: 'password' });

    await flushPromises();
    expect(wrapper.findComponent(Login).exists()).toBe(false);
  });
});
