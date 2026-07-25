"use client";

import {
  GridOutline,
  SyncOutline,
  BarChartOutline,
  FolderOutline,
  PeopleOutline,
  AddOutline,
  ChevronDownOutline,
  EllipsisVertical,
  SearchOutline,
  MailOutline,
  NotificationsOutline,
  SettingsOutline,
  HelpCircleOutline,
  LogoGithub,
  MenuOutline,
  TrendingUpOutline,
  TrendingDownOutline,
  DocumentTextOutline,
  CheckmarkCircle,
  EllipseOutline,
  TimeOutline,
  CodeOutline,
  LayersOutline,
  HardwareChipOutline,
  ServerOutline,
} from "react-ionicons";

const map = {
  grid: GridOutline,
  sync: SyncOutline,
  "bar-chart": BarChartOutline,
  folder: FolderOutline,
  people: PeopleOutline,
  add: AddOutline,
  "chevron-down": ChevronDownOutline,
  "ellipsis-vertical": EllipsisVertical,
  search: SearchOutline,
  mail: MailOutline,
  notifications: NotificationsOutline,
  settings: SettingsOutline,
  "help-circle": HelpCircleOutline,
  "logo-github": LogoGithub,
  menu: MenuOutline,
  "trending-up": TrendingUpOutline,
  "trending-down": TrendingDownOutline,
  "document-text": DocumentTextOutline,
  "checkmark-circle": CheckmarkCircle,
  ellipse: EllipseOutline,
  time: TimeOutline,
  code: CodeOutline,
  layers: LayersOutline,
  cpu: HardwareChipOutline,
  database: ServerOutline,
} as const;

export type IconName = keyof typeof map;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

export default function Icon({ name, size = 16, color = "#A1A1AA", className }: IconProps) {
  const Cmp = map[name];
  return (
    <span className={className} style={{ display: "inline-flex", lineHeight: 0 }}>
      <Cmp color={color} height={`${size}px`} width={`${size}px`} />
    </span>
  );
}
