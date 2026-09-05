export interface PlayerInfo {
  name: string;
  phone: string;
  avatarFileName?: string | undefined;
  createdAt: string;
}

export interface PlayerInfoDraft {
  name: string;
  phone: string;
}

export interface PlayerInfoErrors {
  name?: string | undefined;
  phone?: string | undefined;
}
