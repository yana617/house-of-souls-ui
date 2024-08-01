/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { API_HOST } from '@/constants';
import { IS_AUTH } from '@/mocks/constants';
import claimMocks from './mocks';
import userAdditionalFieldMocks from '../userAdditionalFields/mocks';
import userMocks from '../users/mocks';

import mockUtils from '../utils';

export default [
  rest.get(`${API_HOST}/claims`, (req, res, ctx) => {
    const from = req.url.searchParams.get('from');
    const to = req.url.searchParams.get('to');

    if (!from || !to) {
      return res(
        ctx.status(400),
        ctx.json({
          success: false,
          message: 'From and to should be provided',
        }),
      );
    }

    let claims = claimMocks.filter((claim) => {
      const claimDateInSecs = new Date(claim.date).getTime();
      return claimDateInSecs > from && claimDateInSecs < to;
    });

    claims = claims.map((claim) => {
      const { user_id } = claim;
      const user = userMocks.find((u) => u._id === user_id);
      const user_additional_fields = userAdditionalFieldMocks.filter(
        (uaf) => uaf.user_id === user_id,
      );
      return {
        ...claim,
        data: {
          ...user,
          user_additional_fields,
        },
      };
    });

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: claims,
      }),
    );
  }),

  rest.get(`${API_HOST}/users/:userId/claims`, (req, res, ctx) => {
    const { userId } = req.params;

    const claims = claimMocks.filter((claim) => claim.user_id === userId);

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: claims,
      }),
    );
  }),

  rest.delete(`${API_HOST}/claims/:id`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(403),
        ctx.json({ success: false, message: 'Please, authorize to delete a claim' }),
      );
    }

    const { id } = req.params;

    const claimFromDB = claimMocks.find((claim) => claim._id === id);
    if (!claimFromDB) {
      return res(ctx.status(404), ctx.json({ success: false }));
    }

    claimMocks.splice(claimMocks.indexOf(claimFromDB), 1);

    return res(ctx.status(204));
  }),
  rest.post(`${API_HOST}/claims`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(403),
        ctx.json({ success: false, message: 'Please, authorize to create a claim' }),
      );
    }

    const claimFromRequest = mockUtils.clearClaimRequest(req.body && req.body.claim);
    const checkClaimResult = mockUtils.checkRequiredClaimFields(claimFromRequest);

    if (checkClaimResult.error) {
      return res(ctx.status(400), ctx.json(checkClaimResult));
    }

    const newClaim = {
      ...claimFromRequest,
      _id: uuidv4(),
    };

    claimMocks.push(newClaim);

    return res(
      ctx.json({
        data: newClaim,
        success: true,
      }),
      ctx.status(201),
    );
  }),
];
