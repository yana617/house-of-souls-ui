import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';

import { API_HOST } from '@/constants';
import { IS_AUTH } from '@/mocks/constants';

import mockUtils from '../utils';
import additionalFieldTemplateMocks from './mocks';

export default [
  rest.get(`${API_HOST}/additional-field-templates`, (_, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      additionalFieldTemplates: additionalFieldTemplateMocks,
    }),
  )),

  rest.post(`${API_HOST}/additional-field-templates`, (req, res, ctx) => {
    const isAuth = sessionStorage.getItem(IS_AUTH);

    if (!isAuth) {
      return res(
        ctx.status(403),
        ctx.json({ errorMessage: 'Please, authorize to create a new notice' }),
      );
    }

    const additionalFieldTemplateFromRequest = mockUtils
      .clearAdditionalFieldTemplateRequest(req.body);
    const checkAdditionalFieldTemplateResult = mockUtils
      .checkRequiredAdditionalFieldTemplateFields(additionalFieldTemplateFromRequest);

    if (checkAdditionalFieldTemplateResult.error) {
      return res(
        ctx.status(400),
        ctx.json(checkAdditionalFieldTemplateResult),
      );
    }

    const newAdditionalFieldTemplate = {
      ...additionalFieldTemplateFromRequest,
      _id: uuidv4(),
    };

    additionalFieldTemplateMocks.push(newAdditionalFieldTemplate);

    return res(
      ctx.status(201),
      ctx.json({
        additionalFieldTemplate: newAdditionalFieldTemplate,
      }),
    );
  }),
];
