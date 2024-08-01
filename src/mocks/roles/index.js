/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import { API_HOST } from '@/constants';
import { IS_AUTH } from '@/mocks/constants';

import roleMocks from './mocks';

export default [
  rest.get(`${API_HOST}/roles`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(403),
        ctx.json({ success: false, message: 'Please, authorize' }),
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: roleMocks,
      }),
    );
  }),
];
