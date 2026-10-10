export type TVCommand = 
  | 'POWER' 
  | 'HOME' 
  | 'BACK' 
  | 'UP' 
  | 'DOWN' 
  | 'LEFT' 
  | 'RIGHT' 
  | 'ENTER' 
  | 'VOL_UP' 
  | 'VOL_DOWN' 
  | 'MUTE' 
  | 'CH_UP' 
  | 'CH_DOWN'
  | 'PLAY'
  | 'PAUSE';

export interface TVConfig {
  ipAddress: string;
  port: number;
}

