let currentAvatarUrl: string | null = null;

export function createPlayerAvatarPreview(file: File): string {
  if (currentAvatarUrl) URL.revokeObjectURL(currentAvatarUrl);
  currentAvatarUrl = URL.createObjectURL(file);
  return currentAvatarUrl;
}

export function getPlayerAvatar(): string | null {
  return currentAvatarUrl;
}

export function clearPlayerAvatar(): void {
  if (!currentAvatarUrl) return;
  URL.revokeObjectURL(currentAvatarUrl);
  currentAvatarUrl = null;
}
