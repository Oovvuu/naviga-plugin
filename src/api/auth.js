import authClient from './authClient';

const authService = {
  login: () => authClient.loginWithPopup(),
  logout: async () => {
    authClient.logout({
      returnTo: window.location.origin,
    });
  },
  isAuthenticated: () => authClient.getTokenSilently(),
  getUser: () => authClient.getUser(),
};

export default authService;
