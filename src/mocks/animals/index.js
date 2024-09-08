import { rest } from 'msw';

import { API_HOST } from '@/constants';

import data from './mocks.json';

export default [
  rest.get(`${API_HOST}/animals`, (req, res, ctx) => {
    let { animals } = data;
    const type = req.url.searchParams.get('type');
    const sex = req.url.searchParams.get('sex');
    const place = req.url.searchParams.get('place');
    const room = req.url.searchParams.get('room');
    const sterilized = req.url.searchParams.get('sterilized');
    const status = req.url.searchParams.get('status');

    if (type) {
      animals = animals.filter((animal) => animal.type === type);
    }
    if (sex) {
      animals = animals.filter((animal) => animal.sex === sex);
    }
    if (place) {
      animals = animals.filter((animal) => animal.place === place);
    }
    if (room) {
      animals = animals.filter((animal) => animal.room === room);
    }
    if (sterilized) {
      animals = animals.filter((animal) => (sterilized === 'true' ? animal.sterilized : !animal.sterilized));
    }
    if (status) {
      animals = animals.filter((animal) => animal.status === status);
    }

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: animals,
      }),
    );
  }),

  rest.get(`${API_HOST}/animals/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const responseData = data.animals.find((animal) => animal.id === id);

    if (!responseData) return res(ctx.status(404), ctx.json({ success: false }));

    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: responseData,
      }),
    );
  }),
];
