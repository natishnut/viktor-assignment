import { Avatar } from '@mui/material';
import { getAvatarUrl } from '@/utils/imageUtils';
import type { Author } from '@/types';

interface AuthorAvatarProps {
  author: Author;
  size?: number;
}

export function AuthorAvatar({ author, size = 32 }: AuthorAvatarProps) {
  const avatarUrl = getAvatarUrl(author.avatar);
  const displayName = author.name || author.full_name || 'A';
  const initials = displayName.charAt(0).toUpperCase();

  if (avatarUrl) {
    return (
      <Avatar 
        src={avatarUrl} 
        alt={displayName} 
        sx={{ width: size, height: size }} 
      />
    );
  }

  return (
    <Avatar sx={{ width: size, height: size }}>
      {initials}
    </Avatar>
  );
}

