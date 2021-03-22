/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { API_HOST } from '@/constants';
import { IS_AUTH } from '@/mocks/constants';

import mockUtils from '../utils';
import { notices as data } from './mocks.json';

export default [
  // getting a list of notices id
  rest.get(`${API_HOST}/notices`, (_, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    const responseData = data.reduce((list, notice) => [
      ...list,
      ...(isAuth ? [notice._id] : [notice.authorized ? undefined : notice._id]),
    ], []);

    return res(
      ctx.status(200),
      ctx.json({
        notices: responseData.filter((n) => !!n),
      }),
    );
  }),

  // getting a single notice data by ID
  rest.get(`${API_HOST}/notices/:id`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);
    const { id } = req.params;

    const responseData = data.find((notice) => notice._id === id);

    if (!responseData) return res(ctx.status(404));
    if (responseData.authorized && !isAuth) return res(ctx.status(403));

    return res(
      ctx.status(200),
      ctx.json({
        notice: responseData,
      }),
    );
  }),

  // updating a single notice data by ID
  rest.patch(`${API_HOST}/notices/:id`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    // probably unauthorized user is unable to change any notice
    if (!isAuth) {
      return res(
        ctx.status(401),
        ctx.json({ errorMessage: 'Please, authorize to change a notice' }),
      );
    }

    const { id } = req.params;
    const noticeFromRequest = mockUtils.clearNoticeRequest(req.body && req.body.notice);

    const noticeFromDB = data.find((notice) => notice._id === id);

    if (!noticeFromDB) return res(ctx.status(404));

    // changing an entity in DB
    data.forEach((notice, index) => {
      if (notice._id === id) {
        data[index] = {
          ...notice,
          ...noticeFromRequest,
        };
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        notice: {
          ...noticeFromDB,
          ...noticeFromRequest,
        },
      }),
    );
  }),

  // creating a new notice
  rest.post(`${API_HOST}/notices`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(403),
        ctx.json({ errorMessage: 'Please, authorize to create a new notice' }),
      );
    }

    const noticeFromRequest = mockUtils.clearNoticeRequest(req.body && req.body.notice);
    const checkNoticeResult = mockUtils.checkRequiredNoticeFields(noticeFromRequest);

    if (checkNoticeResult.error) {
      return res(
        ctx.status(400),
        ctx.json(checkNoticeResult),
      );
    }

    // creating a notice in the DB
    const newNotice = {
      ...noticeFromRequest,
      _id: uuidv4(),
    };

    data.push(newNotice);

    return res(
      ctx.status(201),
      ctx.json({
        notice: newNotice,
      }),
    );
  }),

  // deleting a notice
  rest.delete(`${API_HOST}/notices/:id`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(403),
        ctx.json({ errorMessage: 'Please, authorize to delete a notice' }),
      );
    }

    const { id } = req.params;

    const noticeFromDB = data.find((notice) => notice._id === id);
    if (!noticeFromDB) {
      return res(
        ctx.status(404),
      );
    }

    // deleting the notice in the DB
    delete data[data.indexOf(noticeFromDB)];

    return res(
      ctx.status(204),
    );
  }),
];
