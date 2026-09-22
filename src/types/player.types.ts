export interface PlayerInfo {
  name: string;
  createdAt: string;
}

export interface PlayerInfoDraft {
  name: string;
}

export interface PlayerInfoErrors {
  name?: string | undefined;
}
