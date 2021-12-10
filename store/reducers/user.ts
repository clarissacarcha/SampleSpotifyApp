import { AnyAction } from 'redux'
import {
  GET_USER_PLAYLISTS,
  GET_USER_PROFILE,
  GET_USER_RECENTLY_PLAYED,
  GET_USER_TOP_ARTISTS,
  GET_USER_FOLLOWS,
} from '../actions/user'

const initialState = {
  data: {
    display_name: '',
    images: undefined,
  },
  playlists: [
    {
      id: '',
      name: '',
      owner: { display_name: '' },
      tracks: { total: '' },
    },
  ],
  recentlyPlayed: [],
  topArtists: [{ images: undefined }],
  follows: [],
}

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        data: action.data,
      }

    case GET_USER_PLAYLISTS:
      return { ...state, playlists: action.playlists }

    case GET_USER_RECENTLY_PLAYED: {
      return { ...state, recentlyPlayed: action.recentlyPlayed }
    }

    case GET_USER_TOP_ARTISTS: {
      return { ...state, topArtists: action.topArtists }
    }

    case GET_USER_FOLLOWS: {
      return { ...state, follows: action.follows }
    }

    default:
      return state
  }
}