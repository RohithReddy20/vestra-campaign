import { AnalyticsEvent, trackEvent } from '../utils/analytics';

export const ExampleComponent = () => {
  const handlePredictionClick = (agentId: 'predictions' | 'resolutions', xId: string) => {
    trackEvent(AnalyticsEvent.CLICK_PREDICTION, {
      agent_id: agentId,
      x_id: xId,
    });
  };

  const handleShare = (
    agentId: string,
    xId: string,
    socialPlatform: 'X' | 'whatsapp' | 'linkedin' | 'facebook'
  ) => {
    trackEvent(AnalyticsEvent.CLICK_SHARE, {
      agent_id: agentId,
      x_id: xId,
      social_id: socialPlatform,
    });
  };

  return (
    <div>
      {/* Example usage */}
      <button onClick={() => handlePredictionClick('predictions', '123456')}>
        Click Prediction
      </button>

      <button onClick={() => handleShare('agent123', '123456', 'X')}>Share on X</button>
    </div>
  );
};
