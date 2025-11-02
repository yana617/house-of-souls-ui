import { rest } from 'msw';

import { API_HOST } from '@/constants';
import { IS_AUTH } from '@/mocks/constants';

import userAdditionalFieldMocks from './mocks';

export default [
  rest.get(`${API_HOST}/user-additional-fields`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(401),
        ctx.json({ success: false, error: 'Please, authorize to change a notice' }),
      );
    }

    const userId = req.url.searchParams.get('userId');
    const responseData = userAdditionalFieldMocks.filter((uaf) => uaf.user_id === userId);

    return res(
      ctx.status(200),
      ctx.json({
        userAdditionalFields: responseData,
      }),
    );
  }),

  rest.patch(`${API_HOST}/user-additional-fields/:id`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(401),
        ctx.json({ success: false, error: 'Please, authorize to change a notice' }),
      );
    }

    const { id } = req.params;
    const value = req.url.searchParams.get('value');

    const userAdditionalFieldFromDB = userAdditionalFieldMocks.find((uaf) => uaf._id === id);

    if (!userAdditionalFieldFromDB) return res(ctx.status(404));

    userAdditionalFieldMocks.forEach((uaf, index) => {
      if (uaf._id === id) {
        userAdditionalFieldMocks[index] = {
          ...userAdditionalFieldFromDB,
          value: value === 'true',
        };
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
      }),
    );
  }),
];
