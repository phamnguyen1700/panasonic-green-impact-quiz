export interface PlayerInfo {
  name: string;
  phone?: string;
  createdAt: string;
}

export interface PlayerInfoDraft {
  name: string;
  phone: string;
}

export interface PlayerInfoErrors {
  name?: string;
  phone?: string;
}
