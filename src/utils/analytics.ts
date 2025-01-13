import * as amplitude from '@amplitude/analytics-browser';

// Event names enum
export enum AnalyticsEvent {
  // Page View Events
  PREDICTIONS_WEBSITE_OPEN = 'PREDICTIONS_WEBSITE_OPEN',

  // Prediction Start Events
  PREDICTIONS_START_PREDICTIONS = 'PREDICTIONS_START_PREDICTIONS',
  PREDICTIONS_START_RESOLUTIONS = 'PREDICTIONS_START_RESOLUTIONS',

  // Navigation Button Events
  PREDICTIONS_CLICK_VISIT_VESTRA = 'PREDICTIONS_CLICK_VISIT_VESTRA',
  PREDICTIONS_CLICK_FOLLOW_TWITTER = 'PREDICTIONS_CLICK_FOLLOW_TWITTER',
  PREDICTIONS_CLICK_HOME = 'PREDICTIONS_CLICK_HOME',

  // Share Events
  PREDICTIONS_TWITTER_SHARE_PREDICTIONS = 'PREDICTIONS_TWITTER_SHARE_PREDICTIONS',
  PREDICTIONS_TWITTER_SHARE_RESOLUTIONS = 'PREDICTIONS_TWITTER_SHARE_RESOLUTIONS',

  // Try With Own Profile Event
  PREDICTIONS_TRY_WITH_OWN_PROFILE = 'PREDICTIONS_TRY_WITH_OWN_PROFILE',
}

// Event properties types
export interface AnalyticsEventProperties {
  [AnalyticsEvent.PREDICTIONS_WEBSITE_OPEN]: {
    page_url: string;
    referrer: string;
  };
  [AnalyticsEvent.PREDICTIONS_START_PREDICTIONS]: {
    username: string;
  };
  [AnalyticsEvent.PREDICTIONS_START_RESOLUTIONS]: {
    username: string;
  };
  [AnalyticsEvent.PREDICTIONS_TWITTER_SHARE_PREDICTIONS]: {
    username: string;
  };
  [AnalyticsEvent.PREDICTIONS_TWITTER_SHARE_RESOLUTIONS]: {
    username: string;
  };
  [AnalyticsEvent.PREDICTIONS_TRY_WITH_OWN_PROFILE]: {
    username: string;
  };
}

// Initialize Amplitude
export const initializeAnalytics = () => {
  amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, { autocapture: true });
  trackWebsiteOpen();
};

// Generic track event function with type safety
export const trackEvent = <T extends AnalyticsEvent>(
  eventName: T,
  properties?: T extends keyof AnalyticsEventProperties ? AnalyticsEventProperties[T] : never
) => {
  amplitude.track(eventName, properties);
};

// Tracking functions for each specific event
export const trackPredictionStart = (type: 'predictions' | 'resolutions', username: string) => {
  const eventName =
    type === 'predictions'
      ? AnalyticsEvent.PREDICTIONS_START_PREDICTIONS
      : AnalyticsEvent.PREDICTIONS_START_RESOLUTIONS;

  trackEvent(eventName, { username });
};

export const trackVisitVestra = () => {
  trackEvent(AnalyticsEvent.PREDICTIONS_CLICK_VISIT_VESTRA);
};

export const trackFollowTwitter = () => {
  trackEvent(AnalyticsEvent.PREDICTIONS_CLICK_FOLLOW_TWITTER);
};

export const trackShare = (type: 'predictions' | 'resolutions', username: string) => {
  const eventName =
    type === 'predictions'
      ? AnalyticsEvent.PREDICTIONS_TWITTER_SHARE_PREDICTIONS
      : AnalyticsEvent.PREDICTIONS_TWITTER_SHARE_RESOLUTIONS;

  trackEvent(eventName, { username });
};

export const trackTryWithOwnProfile = (username: string) => {
  trackEvent(AnalyticsEvent.PREDICTIONS_TRY_WITH_OWN_PROFILE, { username });
};

export const trackWebsiteOpen = () => {
  trackEvent(AnalyticsEvent.PREDICTIONS_WEBSITE_OPEN, {
    page_url: window.location.href,
    referrer: document.referrer,
  });
};
