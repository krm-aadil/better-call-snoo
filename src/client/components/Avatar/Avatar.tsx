import React from 'react';

type AvatarProps = {
  userId?: string | undefined;
  username: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
};

export const Avatar: React.FC<AvatarProps> = ({ 
  userId, 
  username, 
  size = 'medium', 
  className = '' 
}) => {
  // Generate avatar URL based on Reddit's avatar system
  const getAvatarUrl = () => {
    if (userId) {
      // Try Reddit's avatar URL patterns
      // Reddit uses different patterns for avatars, let's try a few common ones
      const patterns = [
        `https://www.redditstatic.com/avatars/defaults/v2/avatar_default_${Math.abs(hashCode(userId)) % 20}.png`,
        `https://styles.redditmedia.com/t5_${userId}/styles/profileIcon_snoo-nftv2_bmZ0X2VpcGZzOmlwZnM6Ly9RbWZKWFpkdmJHZjZIc056S1RkclFqQnJSRzVtV0dSaGJHVnJhM1JoYVdGdVpHVnk.png`,
        `https://www.redditstatic.com/avatars/avatar_default_${Math.abs(hashCode(username)) % 20}_${size}.png`
      ];
      
      // For now, use a deterministic pattern based on username
      return `https://www.redditstatic.com/avatars/defaults/v2/avatar_default_${Math.abs(hashCode(username)) % 20}.png`;
    }
    
    // Fallback to default
    return '/snoo.png';
  };

  // Simple hash function for consistent avatar selection
  const hashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  };

  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-white border-2 border-black flex items-center justify-center overflow-hidden ${className}`}>
      <img
        src={getAvatarUrl()}
        alt={`${username} avatar`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to local snoo image if Reddit avatar fails
          (e.currentTarget as HTMLImageElement).src = '/snoo.png';
        }}
      />
    </div>
  );
};
