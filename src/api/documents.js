import axios from 'axios';

import { DOCUMENTS_URL } from './constants';

export const documentsApi = {
  uploadDocuments: async (body) =>
    axios
      .post(DOCUMENTS_URL, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data)
      .catch((error) => error.response.data),
};