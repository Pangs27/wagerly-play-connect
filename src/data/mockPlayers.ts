import { Player } from '@/types/matchmaking';

export const mockPlayers: Player[] = [
  {
    player_id: '1',
    handle: 'ShadowNinja',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=shadow',
    mmr: { value: 2450, ci: 50, tier: 'Diamond' },
    platform: 'PC',
    region: 'Mumbai',
    latency_ms: 35,
    modes: ['1v1', 'Duos'],
    intent: 'Play now',
    availability: { status: 'Now' },
    recent_form: [
      { result: 'W' }, { result: 'W' }, { result: 'L' }, 
      { result: 'W' }, { result: 'D' }, { result: 'W' },
      { result: 'W' }, { result: 'L' }, { result: 'W' }, { result: 'W' }
    ],
    sportsmanship_score: 92,
    reports_30d: 0,
    voice_chat: true,
    verification: { device: true, telemetry: true, low_reports: true }
  },
  {
    player_id: '2',
    handle: 'PhoenixRider',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=phoenix',
    mmr: { value: 2380, ci: 75, tier: 'Diamond' },
    platform: 'PS5',
    region: 'Delhi',
    latency_ms: 52,
    modes: ['1v1', 'Team'],
    intent: 'Play now',
    availability: { status: '5m' },
    recent_form: [
      { result: 'W' }, { result: 'L' }, { result: 'W' }, 
      { result: 'W' }, { result: 'W' }, { result: 'L' },
      { result: 'W' }, { result: 'D' }, { result: 'W' }, { result: 'L' }
    ],
    sportsmanship_score: 88,
    reports_30d: 1,
    voice_chat: true,
    verification: { device: true, telemetry: true, low_reports: true }
  },
  {
    player_id: '3',
    handle: 'ThunderBolt',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=thunder',
    mmr: { value: 2520, ci: 40, tier: 'Diamond' },
    platform: 'Xbox',
    region: 'Bangalore',
    latency_ms: 45,
    modes: ['Duos', 'Team'],
    intent: 'Play now',
    availability: { status: 'Now' },
    recent_form: [
      { result: 'W' }, { result: 'W' }, { result: 'W' }, 
      { result: 'L' }, { result: 'W' }, { result: 'W' },
      { result: 'D' }, { result: 'W' }, { result: 'L' }, { result: 'W' }
    ],
    sportsmanship_score: 95,
    reports_30d: 0,
    voice_chat: true,
    verification: { device: true, telemetry: true, low_reports: true }
  },
  {
    player_id: '4',
    handle: 'CyberWolf',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cyber',
    mmr: { value: 2290, ci: 60, tier: 'Platinum' },
    platform: 'PC',
    region: 'Hyderabad',
    latency_ms: 68,
    modes: ['1v1'],
    intent: 'Play now',
    availability: { status: '15m' },
    recent_form: [
      { result: 'L' }, { result: 'W' }, { result: 'L' }, 
      { result: 'W' }, { result: 'W' }, { result: 'L' },
      { result: 'D' }, { result: 'W' }, { result: 'L' }, { result: 'W' }
    ],
    sportsmanship_score: 78,
    reports_30d: 2,
    voice_chat: false,
    verification: { device: true, telemetry: false, low_reports: true }
  },
  {
    player_id: '5',
    handle: 'ViperStrike',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=viper',
    mmr: { value: 2410, ci: 55, tier: 'Diamond' },
    platform: 'Mobile',
    region: 'Mumbai',
    latency_ms: 42,
    modes: ['1v1', 'Duos', 'Team'],
    intent: 'Play now',
    availability: { status: 'Now' },
    recent_form: [
      { result: 'W' }, { result: 'W' }, { result: 'D' }, 
      { result: 'W' }, { result: 'L' }, { result: 'W' },
      { result: 'W' }, { result: 'W' }, { result: 'L' }, { result: 'W' }
    ],
    sportsmanship_score: 90,
    reports_30d: 0,
    voice_chat: true,
    verification: { device: true, telemetry: true, low_reports: true }
  },
  {
    player_id: '6',
    handle: 'DarkSamurai',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=samurai',
    mmr: { value: 2475, ci: 45, tier: 'Diamond' },
    platform: 'PC',
    region: 'Chennai',
    latency_ms: 58,
    modes: ['Team'],
    intent: 'Play now',
    availability: { status: '5m' },
    recent_form: [
      { result: 'W' }, { result: 'L' }, { result: 'W' }, 
      { result: 'W' }, { result: 'W' }, { result: 'W' },
      { result: 'L' }, { result: 'D' }, { result: 'W' }, { result: 'W' }
    ],
    sportsmanship_score: 86,
    reports_30d: 1,
    voice_chat: true,
    verification: { device: true, telemetry: true, low_reports: false }
  },
  {
    player_id: '7',
    handle: 'NeonGhost',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=neon',
    mmr: { value: 2330, ci: 70, tier: 'Platinum' },
    platform: 'PS5',
    region: 'Pune',
    latency_ms: 85,
    modes: ['1v1', 'Duos'],
    intent: 'Play now',
    availability: { status: 'Now' },
    recent_form: [
      { result: 'L' }, { result: 'W' }, { result: 'W' }, 
      { result: 'L' }, { result: 'D' }, { result: 'W' },
      { result: 'L' }, { result: 'W' }, { result: 'W' }, { result: 'L' }
    ],
    sportsmanship_score: 82,
    reports_30d: 3,
    voice_chat: false,
    verification: { device: true, telemetry: true, low_reports: false }
  },
  {
    player_id: '8',
    handle: 'BlazeFury',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=blaze',
    mmr: { value: 2505, ci: 35, tier: 'Diamond' },
    platform: 'Xbox',
    region: 'Mumbai',
    latency_ms: 38,
    modes: ['1v1', 'Team'],
    intent: 'Play now',
    availability: { status: 'Now' },
    recent_form: [
      { result: 'W' }, { result: 'W' }, { result: 'W' }, 
      { result: 'W' }, { result: 'L' }, { result: 'W' },
      { result: 'W' }, { result: 'D' }, { result: 'W' }, { result: 'W' }
    ],
    sportsmanship_score: 94,
    reports_30d: 0,
    voice_chat: true,
    verification: { device: true, telemetry: true, low_reports: true }
  }
];

export const filterPresets = [
  {
    name: 'Balanced',
    mmrRange: 150,
    maxPing: 60,
    voiceRequired: false,
    regions: ['Mumbai', 'Delhi', 'Bangalore'],
    toxicityCap: 20
  },
  {
    name: 'Try-hard',
    mmrRange: 75,
    maxPing: 45,
    voiceRequired: true,
    regions: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'],
    toxicityCap: 10
  },
  {
    name: 'Chill',
    mmrRange: 300,
    maxPing: 100,
    voiceRequired: false,
    regions: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'],
    toxicityCap: 40
  }
];
