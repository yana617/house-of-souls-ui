/* eslint-disable import/no-extraneous-dependencies */
import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { API_HOST } from '@/constants';
import { IS_AUTH } from '@/mocks/constants';
import { claims as claimsMocks } from './mocks.json';
import { userAdditionalFields as userAdditionalFieldsMocks } from '../userAdditionalFields/mocks.json';
import { users as usersMocks } from '../users/mocks.json';

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

    let claims = claimsMocks.filter((claim) => {
      const claimDateInSecs = new Date(claim.date).getTime();
      return claimDateInSecs > from && claimDateInSecs < to;
    });

    claims = claims.map((claim) => {
      const { user_id } = claim;
      const user = usersMocks.find((u) => u._id === user_id);
      const user_additional_fields = userAdditionalFieldsMocks.filter((uaf) => uaf.user_id === user_id);
      return {
        ...claim,
        user: {
          ...user,
          user_additional_fields,
        },
      };
    });

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        claims,
      }),
    );
  }),

  rest.get(`${API_HOST}/claims/:userId`, (req, res, ctx) => {
    const { userId } = req.params;

    const claims = claimsMocks.filter((claim) => claim.user_id === userId);

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        claims,
        total: claims.length,
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

    const claimFromDB = claimsMocks.find((claim) => claim._id === id);
    if (!claimFromDB) {
      return res(
        ctx.status(404),
        ctx.json({ success: false }),
      );
    }

    claimsMocks.splice(claimsMocks.indexOf(claimFromDB), 1);

    return res(
      ctx.status(204),
    );
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
      return res(
        ctx.status(400),
        ctx.json(checkClaimResult),
      );
    }

    const newClaim = {
      ...claimFromRequest,
      _id: uuidv4(),
    };

    claimsMocks.push(newClaim);

    return res(
      ctx.json({
        claim: newClaim,
        success: true,
      }),
      ctx.status(201),
    );
  }),
];
