import { User } from '../models';

const authController = {
  /**
      * Authenticates a user via social login
      *
      * @param {object} profile - User info from Social platform
      * @param {string} accessToken - access token from facebook
    */
  facebookLogin: async (profile, accessToken) => {
    const username = profile.displayName;
    try {
      const newUser = await User.create({
        username, token: accessToken
      });
      const payload = {
        data: {
          user: {
            displayName: newUser.username
          },
        },
      };
      return payload;
    } catch (error) {
      return error;
    }
  }
};
export default authController;
