export interface TgUserData {
  id: number;
  first_name?: string;
  last_name?: string;
  username: string;
  language_code: string;
  photo_url?: string;
  allows_write_to_pm: boolean;
}
