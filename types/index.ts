export interface Profile {
  id: string;
  display_name: string;
  avatar_url: string | null;
  streak: number;
  xp_today: number;
  xp_goal: number;
  level: number;
  created_at: string;
}

export interface Course {
  id: string;
  user_id: string;
  title: string;
  progress: number;
  icon_name: string;
  color: 'purple' | 'blue' | 'teal' | 'amber';
  created_at: string;
}

export interface NavItem {
  label: string;
  iconName: string;
  href: string;
}

export type AccentColor = 'purple' | 'blue' | 'teal' | 'amber';
