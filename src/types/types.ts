export interface UserData {
  profile_image_url: string;
  rest_id: string;
  user_description: string;
  user_id: string;
  user_name: string;
  username: string;
}

export interface Prediction {
  prediction: string;
}

export interface Predictions {
  predictions: Prediction[];
}

export interface Goal {
  reality: string;
  resolution: string;
}

export interface Resolutions {
  goals: Goal[];
}

export interface Inputs {
  user_data: UserData;
  username: string;
}

export interface Outputs {
  predictions: Predictions;
  resolutions: Resolutions;
}

export interface AdditionalData {
  run_title: string;
  shareable_url: string;
  twitter_username: string;
  x_ping_timestamp: string;
  predictions?: {
    campaign_id: string;
    media_url: string;
    x_ping_timestamp: string;
    shareable_url: string;
  };
  resolutions?: {
    campaign_id: string;
    media_url: string;
    x_ping_timestamp: string;
    shareable_url: string;
  };
}

export interface Data {
  additional_data: AdditionalData;
  batch_id: string;
  current_progress: number;
  current_state: string;
  error: unknown;
  inputs: Inputs;
  outputs: Outputs;
  run_name: string;
  run_requested_by: string;
  status: string;
  system_id: string;
  system_slug: string;
}

export interface PredictionProgress {
  data: Data;
  message: string;
  success: boolean;
}

export interface PredictionStart {
  data: {
    additional_data: {
      twitter_username: string;
    };
    batch_id: string;
    inputs: {
      user_data: {
        profile_image_url: string;
        rest_id: string;
        user_description: string;
        user_id: string;
        user_name: string;
        username: string;
      };
      username: string;
    };
    run_requested_by: string;
    status: string;
    system_id: string;
    system_slug: string;
  };
  message: string;
  success: boolean;
}

export interface ResolutionItem {
  resolution: string;
  reality: string;
}

export interface ResolutionsData {
  data: {
    batch_id: string;
    outputs: {
      resolutions: {
        goals: ResolutionItem[];
      };
    };
  };
}
