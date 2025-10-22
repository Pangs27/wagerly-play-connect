export interface Player {
  player_id: string;
  handle: string;
  avatar_url: string;
  mmr: {
    value: number;
    ci: number; // confidence interval
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Master';
  };
  platform: 'PC' | 'PS5' | 'Xbox' | 'Mobile';
  region: string;
  latency_ms: number;
  modes: string[];
  intent: 'Play now' | 'Schedule' | 'Practice' | 'Scrim';
  availability: {
    status: 'Now' | '5m' | '15m' | '30m';
  };
  recent_form: { result: 'W' | 'L' | 'D' }[];
  sportsmanship_score: number; // 0-100
  reports_30d: number;
  voice_chat: boolean;
  verification: {
    device: boolean;
    telemetry: boolean;
    low_reports: boolean;
  };
}

export type Intent = 'Play now' | 'Schedule' | 'Practice' | 'Scrim';
export type Mode = '1v1' | 'Duos' | 'Team';
export type Stake = 'Just for fun' | 'Tokens' | 'High-stakes';
export type LatencyStatus = 'Good' | 'Okay' | 'Poor';

export interface FilterPreset {
  name: string;
  mmrRange: number;
  maxPing: number;
  voiceRequired: boolean;
  regions: string[];
  toxicityCap: number;
}

export interface QueueStats {
  personalETA: number; // seconds
  queueSize: number;
  medianWait: number; // seconds
}
