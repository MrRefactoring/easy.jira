import { Config } from 'jira.js';
import { apiToken, email, host } from './env';

export const config: Config = {
  host,
  authentication: {
    basic: {
      email,
      apiToken,
    },
  },
};
