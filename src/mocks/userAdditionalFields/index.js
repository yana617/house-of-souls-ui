/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';

import { API_HOST } from '@/constants';
import { IS_AUTH } from '@/mocks/constants';

import data from './mocks.json';

export default [
  rest.get(`${API_HOST}/user-additional-fields`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(401),
        ctx.json({ errorMessage: 'Please, authorize to change a notice' }),
      );
    }

    const userId = req.url.searchParams.get('userId');
    const responseData = data.userAdditionalFields.filter((uaf) => uaf.user_id === userId);

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
        ctx.json({ errorMessage: 'Please, authorize to change a notice' }),
      );
    }

    const { id } = req.params;
    const value = req.url.searchParams.get('value');

    const userAdditionalFieldFromDB = data.userAdditionalFields.find((uaf) => uaf._id === id);

    if (!userAdditionalFieldFromDB) return res(ctx.status(404));

    data.userAdditionalFields.forEach((uaf, index) => {
      if (uaf._id === id) {
        data.userAdditionalFields[index] = {
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
