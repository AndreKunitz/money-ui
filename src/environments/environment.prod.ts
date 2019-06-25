export const environment = {
  production: true,
  apiUrl: 'https://andremoney-api.herokuapp.com',

  tokenWhitelistedDomains: [new RegExp('andremoney-api.herokuapp.com')],
  tokenBlacklistedRoutes: [new RegExp('/oauth/token')]
};
