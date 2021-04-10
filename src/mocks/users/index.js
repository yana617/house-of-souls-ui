/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { API_HOST } from '@/constants';
import { IS_AUTH } from '@/mocks/constants';

import mockUtils from '../utils';
import data from './mocks.json';

export default [
  // logging a user in
  rest.post(`${API_HOST}/login`, (req, res, ctx) => {
    const { phone } = req.body.user;

    if (!phone) {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: 'Please provide a phone number to log in',
        }),
      );
    }

    const userFromDB = data.users.find((user) => user.phone === phone);

    if (!userFromDB) {
      return res(
        ctx.status(401),
        ctx.json({
          errorMessage: `There is no registered users with phone ${phone}. Please, register`,
        }),
      );
    }

    sessionStorage.setItem(IS_AUTH, 'true');
    return res(
      ctx.status(200),
      ctx.json({
        user: userFromDB,
      }),
    );
  }),

  // logging the user out (probably METHOD needs to be refactored according to API implementation)
  rest.delete(`${API_HOST}/logout`, (_, res, ctx) => {
    // to simplify mocks there are no checks that the request comes from the logging out user
    sessionStorage.removeItem(IS_AUTH);

    return res(
      ctx.status(200),
    );
  }),

  // creating a new user
  rest.post(`${API_HOST}/register`, (req, res, ctx) => {
    const userFromRequest = mockUtils.clearUserRequest(req.body.user);

    const checkRegisterResult = mockUtils.checkRequiredUserFields(userFromRequest);

    if (checkRegisterResult.error) {
      return res(
        ctx.status(400),
        ctx.json(checkRegisterResult),
      );
    }

    // creating a new user
    const newUser = {
      ...userFromRequest,
      _id: uuidv4(),
    };
    data.users.push(newUser);

    sessionStorage.setItem(IS_AUTH, 'true');
    return res(
      ctx.status(200),
      ctx.json({
        user: newUser,
      }),
    );
  }),

  rest.patch(`${API_HOST}/users/:id`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(401),
        ctx.json({ errorMessage: 'Please, authorize to change a user' }),
      );
    }

    const { id } = req.params;

    const userFromDb = data.users.find((user) => user._id === id);
    const userFromRequest = mockUtils.clearUserRequest(req.body);

    if (!userFromDb) return res(ctx.status(404));

    data.users.forEach((user, index) => {
      if (user._id === id) {
        data.users[index] = {
          ...user,
          ...userFromRequest,
        };
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        user: {
          ...userFromDb,
          ...userFromRequest,
        },
      }),
    );
  }),
];
