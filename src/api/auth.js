import authClient from './authClient.js'

const authService = {
    login: () => {
        return authClient.loginWithPopup()
    },
    logout: async () => {
        authClient.logout({
            returnTo: window.location.origin
        })
    },
    isAuthenticated: () => {
        return authClient.getTokenSilently()
    },
    getUser: () => {
        return authClient.getUser();
    }
}

export default authService;
