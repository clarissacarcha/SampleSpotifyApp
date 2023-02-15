import dotenv from 'dotenv';
import SpotifyWebApi from 'spotify-web-api-node';
dotenv.config();

const spotifyConfig = {
  clientId: 'c5aa8b28820148718bc5e6e60e849ed0',
  clientSecret: 'aa6bfe651e2b44c784ad002760d68bb9',
  redirectUri: 'com.spotifyclone://oauth/',
};

const spotifyApi = new SpotifyWebApi(spotifyConfig);

export const proxySpotifyToken = async (req, res) => {
  const { code } = req.body;
  const refreshToken = req.body.refresh_token;
  console.log(code, refreshToken);
  if (!code && !refreshToken) {
    return res.status(403).json({ success: false, data: 'Not authorized' });
  }

  if (refreshToken) {
    spotifyApi.setRefreshToken(refreshToken);
    spotifyApi
      .refreshAccessToken()
      .then(
        (data) => {
          data.body.refreshToken = refreshToken;
          return res.json(data.body);
        },
        (error) => {
          console.log('Could not refresh access token', error);
        }
      )
      .catch((onError) => {
        return res.json(onError);
      });
  }

  if (code) {
    spotifyApi
      .authorizationCodeGrant(code)
      .then(
        (data) => {
          return res.json(data.body);
        },
        (err) => {
          console.log('Something went wrong,', err);
        }
      )
      .catch((error) => {
        return res.json(error);
      });
  }
};
