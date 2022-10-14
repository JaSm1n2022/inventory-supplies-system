export const apiConfig = {
  API_URL: process.env.REACT_APP_API_URL,
  // API_URL: 'https://soar-tst.clockworkdelivery.com/',
  // API_URL: 'http://localhost:3001/',
 API_KEY: process.env.REACT_APP_API_KEY
};

export const appsConfig = {
  LANDING_PAGE_URL: {
    BASE_URL: process.env.REACT_APP_LANDING_PAGE_URL,
    LOGIN: `${process.env.REACT_APP_LANDING_PAGE_URL}/auth`
  }
};

export const awsConfig = {
  S3_URL_PREFIX: 'test'
};

export const plaidConfig = {
  publicKey: process.env.REACT_APP_PLAID_PUBLIC_KEY,
  env: process.env.REACT_APP_PLAID_PUBLIC_ENV
};


export default {
  apiConfig,
  appsConfig,
  plaidConfig
};
