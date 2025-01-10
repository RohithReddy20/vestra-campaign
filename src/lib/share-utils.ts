export class ShareURLBuilder {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  buildShareUrls(batchId: string, campaignId: string, type: string) {
    const shareUrl = `${this.baseUrl}/share?type=${type}&batchId=${batchId}&campaignId=${campaignId}`;

    const text =
      type === 'predictions'
        ? '🔮 Here’s what the AI predicts for me in 2025.  Try yours! Built on @vestra_ai'
        : '🎯 My New Year resolutions, crafted by an AI Agent. Create yours now! Built on @vestra_ai';

    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;

    return {
      shareUrl,
      twitterShareUrl,
    };
  }
}
