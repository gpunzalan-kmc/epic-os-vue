export interface Menu {
  label: string;
  items: Array<{
    title: string;
    name: string;
    icon: string;
    subMenu: Array<{ title: string; name: string; icon: string }>;
  }>;
}
