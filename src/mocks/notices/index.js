/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { API_HOST } from '@/constants';
import { IS_AUTH } from '@/mocks/constants';

import mockUtils from '../utils';
import noticeMocks from './mocks';

export default [
  // getting a list of notices id
  rest.get(`${API_HOST}/notices`, (_, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    const responseData = noticeMocks.reduce((list, notice) => [
      ...list,
      ...(isAuth ? [notice._id] : [notice.authorized ? undefined : notice._id]),
    ], []);

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: responseData.filter((n) => !!n),
      }),
    );
  }),

  // getting a single notice data by ID
  rest.get(`${API_HOST}/notices/:id`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);
    const { id } = req.params;

    const responseData = noticeMocks.find((notice) => notice._id === id);

    if (!responseData) return res(ctx.status(404), ctx.json({ success: false }));
    if (responseData.authorized && !isAuth) return res(ctx.status(403));

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: responseData,
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
        ctx.json({ success: false, message: 'Please, authorize to change a notice' }),
      );
    }

    const { id } = req.params;
    const noticeFromRequest = mockUtils.clearNoticeRequest(req.body && req.body.notice);

    const noticeFromDB = noticeMocks.find((notice) => notice._id === id);

    if (!noticeFromDB) return res(ctx.status(404), ctx.json({ success: false }));

    // changing an entity in DB
    noticeMocks.forEach((notice, index) => {
      if (notice._id === id) {
        noticeMocks[index] = {
          ...notice,
          ...noticeFromRequest,
        };
      }
    });

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: {
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
        ctx.json({ success: false, message: 'Please, authorize to create a new notice' }),
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

    noticeMocks.push(newNotice);

    return res(
      ctx.status(201),
      ctx.json({
        data: newNotice,
        success: true,
      }),
    );
  }),

  // deleting a notice
  rest.delete(`${API_HOST}/notices/:id`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(403),
        ctx.json({ success: false, message: 'Please, authorize to delete a notice' }),
      );
    }

    const { id } = req.params;

    const noticeFromDB = noticeMocks.find((notice) => notice._id === id);
    if (!noticeFromDB) {
      return res(
        ctx.status(404),
        ctx.json({ success: false }),
      );
    }

    // deleting the notice in the DB
    noticeMocks.splice(noticeMocks.indexOf(noticeFromDB), 1);

    return res(
      ctx.status(204),
      ctx.json({ success: true }),
    );
  }),
];
