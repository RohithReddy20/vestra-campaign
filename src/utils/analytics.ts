import * as amplitude from '@amplitude/analytics-browser';

// Event names enum
export enum AnalyticsEvent {
  CLICK_PREDICTION = 'CLICK_PREDICTION',
  BUTTON_CLICK = 'BUTTON_CLICK',
  CLICK_SHARE = 'CLICK_SHARE',
  CLICK_TRY_WITH_OWN_PROFILE = 'CLICK_TRY_WITH_OWN_PROFILE',
  WEBSITE_OPEN = 'WEBSITE_OPEN',
}

// Event properties types
export interface AnalyticsEventProperties {
  [AnalyticsEvent.CLICK_PREDICTION]: {
    agent_id: 'predictions' | 'resolutions';
    x_id: string;
  };
  [AnalyticsEvent.BUTTON_CLICK]: {
    button_id: 'visit vestra' | 'follow on X';
  };
  [AnalyticsEvent.CLICK_SHARE]: {
    agent_id: string;
    x_id: string;
    social_id: 'X' | 'whatsapp' | 'linkedin' | 'facebook';
  };
  [AnalyticsEvent.CLICK_TRY_WITH_OWN_PROFILE]: {
    x_id: string;
  };
  [AnalyticsEvent.WEBSITE_OPEN]: {
    url: string;
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
  properties: AnalyticsEventProperties[T]
) => {
  amplitude.track(eventName, properties);
};

// Common tracking functions
export const trackPredictionClick = (agentId: 'predictions' | 'resolutions', xId: string) => {
  trackEvent(AnalyticsEvent.CLICK_PREDICTION, {
    agent_id: agentId,
    x_id: xId,
  });
};

export const trackButtonClick = (buttonId: 'visit vestra' | 'follow on X') => {
  trackEvent(AnalyticsEvent.BUTTON_CLICK, {
    button_id: buttonId,
  });
};

export const trackShare = (
  agentId: string,
  xId: string,
  socialId: 'X' | 'whatsapp' | 'linkedin' | 'facebook'
) => {
  trackEvent(AnalyticsEvent.CLICK_SHARE, {
    agent_id: agentId,
    x_id: xId,
    social_id: socialId,
  });
};

export const trackTryWithOwnProfile = (xId: string) => {
  trackEvent(AnalyticsEvent.CLICK_TRY_WITH_OWN_PROFILE, {
    x_id: xId,
  });
};

export const trackWebsiteOpen = (url: string = window.location.href) => {
  trackEvent(AnalyticsEvent.WEBSITE_OPEN, {
    url,
  });
};
