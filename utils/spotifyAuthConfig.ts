import { CLIENT_ID, REDIRECT_URL } from '@env';
import { Platform } from 'react-native';

export const spotifyAuthConfig = {
  clientId: 'c5aa8b28820148718bc5e6e60e849ed0',
  redirectUrl: 'com.spotifyclone://oauth/',
  usePKCE: false,
  dangerouslyAllowInsecureHttpRequests: true,
  issuer: 'https://accounts.spotify.com',
  scopes: [
    'playlist-read-private',
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-top-read',
    'user-read-recently-played',
    'user-follow-read',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-modify-playback-state',
    'user-read-playback-position',
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: Platform.OS === 'ios' ? 'http://192.168.0.30:4000/api/user/authentication' : 'http://192.168.0.30:4000/api/user/authentication',
  },
};
