export const environment = {
  production: true,
  apiUrl: 'https://andremoney-ui.herokuapp.com',

  tokenWhitelistedDomains: [new RegExp('andremoney-ui.herokuapp.com')],
  tokenBlacklistedRoutes: [new RegExp('/oauth/token')]
};
