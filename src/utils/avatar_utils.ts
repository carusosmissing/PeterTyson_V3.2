import { Assets } from '../constants';

export const getAvatarSource = (avatar: string, avatarType: 'asset' | 'custom' = 'asset') => {
  if (avatarType === 'custom') {
    return { uri: avatar };
  }
  return Assets.Avatars[avatar as keyof typeof Assets.Avatars] || Assets.Avatars.petertyson;
}; 