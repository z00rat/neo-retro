import posthog from 'posthog-js';

import { browser } from '$app/environment';

export const prerender = true;

export const load = async () => {
  if (browser) {
    posthog.init('phc_EEAVrVpMoYP4EIgweA9bvsuisrLmln8xpPUGwrW4Joj', {
      api_host: 'https://us.i.posthog.com',
      defaults: '2026-01-30',
    });
  }
  return;
};
