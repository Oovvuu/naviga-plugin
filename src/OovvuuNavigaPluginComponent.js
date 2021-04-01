import { Component } from 'substance';
import SearchWrapper from './components/searchWrapper';
import authService from './api/auth';
import getGenres from './api/getGenres';
import getProviders from './api/getProviders';
import * as styles from './OovvuuNavigaPluginComponent.scss';

class OovvuuNavigaPluginComponent extends Component {
  /**
     * Return the inital component state before rendering
     *
     * @returns {object} Component state.
     */
  static getInitialState() {
    return {
      authenticated: null,
      authenticationError: null,
      genres: [],
      providers: [],
    };
  }

  /**
     * Do something after the first render
     */
  didMount() {
    // Check if the user is authenticated.
    this.handleSetAuthState(authService.isAuthenticated());

    // Load filters data.
    this.handleLoadFiltersData();
  }

  /**
     * Loads the filter data from the API into component state.
     */
  handleLoadFiltersData() {
    /**
         * Genres.
         */
    getGenres().then((genres) => {
      // eslint-disable-next-line no-underscore-dangle
      this.setGenres(genres.__type.enumValues.map(({ name }) => ({
        id: name,
        name,
      })));
    }).catch((error) => {
      console.log('Error', error);
    });

    /**
         * Providers.
         */
    getProviders().then((providers) => {
      this.setProviders(providers.organisationSet.pageResults);
    }).catch((error) => {
      console.log('Error', error);
    });
  }

  /**
     * Handles the set auth state based on the resolution of a Promise.
     *
     * @param {Promise} promise Auth promise.
     * @param {Boolean} showError Whether or not to show auth errors.
     */
  handleSetAuthState(promise, showError = false) {
    // Clear the auth state.
    this.clearAuthState();
    this.clearAuthErrorState();

    // Handle promise resolution.
    promise
      .then(() => {
        this.setAuthState(true);
        this.setUser(authService.getUser());
        this.handleLoadFiltersData();
      })
      .catch((error) => {
        if (showError) {
          this.setAuthErrorState(error);
        }

        this.setAuthState(false);
      });
  }

  /**
     * Sets the user object.
     *
     * @param {Promise} promise Get user promise.
     */
  setUser(userPromise) {
    this.clearUser();

    userPromise
      .then((user) => {
        this.extendState({
          user,
        });
      });
  }

  /**
     * Clears the user.
     */
  clearUser() {
    this.extendState({
      user: null,
    });
  }

  /**
     * Sets the authentication state.
     *
     * @param {Boolean} authState True or false.
     */
  setAuthState(authState) {
    this.extendState({
      authenticated: Boolean(authState),
    });
  }

  /**
     * Clears the authentication state.
     */
  clearAuthState() {
    this.extendState({
      authenticated: null,
    });
  }

  /**
     * Sets the authentication error state.
     *
     * @param {object} error Error object.
     */
  setAuthErrorState(error) {
    this.extendState({
      authenticationError: error,
    });
  }

  /**
     * Clears the authentication error state.
     */
  clearAuthErrorState() {
    this.extendState({
      authenticationError: null,
    });
  }

  /**
     * Sets genres.
     *
     * @param {Array} genres An array of genres.
     */
  setGenres(genres) {
    this.extendState({
      genres,
    });
  }

  /**
     * Sets providers.
     *
     * @param {Array} providers An array of providers.
     */
  setProviders(providers) {
    this.extendState({
      providers,
    });
  }

  /**
     * Get based components based on authentication.
     *
     * @param $$
     * @return Components.
     */
  getAuthComponents($$) {
    const components = [];
    const userAuth = $$('div')
      .addClass(styles.userAuth);

    // Not authenticated.
    if (this.state.authenticated === false) {
      const LoginButton = $$('button')
        .addClass(styles.login)
        .on('click', async () => this.handleSetAuthState(
          authService.login(), true,
        ))
        .setInnerHTML('Login');

      // Authentication error
      if (this.state.authenticationError !== null) {
        components.push($$('p')
          .text(this.state.authenticationError));
        components.push($$('p')
          .text('Please contact site admin for support.'));
      }

      return userAuth.append([LoginButton, ...components]);
    }

    if (this.state.authenticated === true) {
      // Add user info if available.
      if (this.state.user) {
        components.push($$('p').append($$('em')
          .text(`Logged in as ${this.state.user.email}`)));
      }

      const LogoutButton = $$('button')
        .addClass(styles.logout)
        .on('click', async () => { authService.logout(); })
        .setInnerHTML('Logout');

      return userAuth.append([...components, LogoutButton]);
    }

    return userAuth.append($$('p').text('Loading user...'));
  }

  /**
     * Render method is called whenever there's a change in state or props
     *
     * @param $$
     * @return Components.
     */
  render($$) {
    const header = $$('div')
      .addClass(styles.header)
      .append([
        $$('div')
          .addClass(styles.logoWrapper)
          .append([
            $$('a').addClass(styles.logo),
            $$('h3')
              .addClass(styles.heading)
              .append(this.getLabel('Oovvuu Video Search')),
          ]),
        this.getAuthComponents($$),
      ]);

    const container = $$('div')
      .addClass(styles.wrapper)
      .append(header);

    if (this.state.authenticated !== true) {
      return container;
    }

    return container.append(
      $$(SearchWrapper, {
        genres: this.state.genres,
        providers: this.state.providers,
      }),
    );
  }
}

export default OovvuuNavigaPluginComponent;
