import 'dotenv/config';

export default {
  google: {
    sheets: {
      clientId: process.env.GOOGLE_SHEET_CLIENT_ID,
      privateKey: process.env.GOOGLE_SHEET_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
  },
};
