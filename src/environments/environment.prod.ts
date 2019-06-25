export const environment = {
  production: true,
  apiUrl: 'https://andremoney-ui.herokuapp.com',

  tokenWhitelistedDomains: [/andremoney-ui.herokuapp.com/],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
};
