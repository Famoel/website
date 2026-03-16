export interface INavlink {
  to: string;
  label: string;
  img?: string;
  logout?: boolean;
  logoutFunc?: () => void;
}
