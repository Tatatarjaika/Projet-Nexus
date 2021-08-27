export const CHANGE_SEARCH_VALUE = 'CHANGE_SEARCH_VALUE';
export const IS_SEARCHING = 'IS_SEARCHING';
export const IS_NOT_SEARCHING = 'IS_NOT_SEARCHING';
export const SEARCH_FRIEND_PROFILE = 'SEARCH_FRIEND_PROFILE';
export const DISPLAY_RESULTS = 'DISPLAY_RESULTS';
export const FRIEND_REQUEST = 'FRIEND_REQUEST';
export const FRIEND_TO_REQUEST = 'FRIEND_TO_REQUEST';

export const changeSearchValue = (value) => ({
  type: CHANGE_SEARCH_VALUE,
  value: value,
});

export const isSearching = () => ({
  type: IS_SEARCHING,
});

export const isNotSearching = () => ({
  type: IS_NOT_SEARCHING,
});

export const searchFriendProfile = () => ({
  type: SEARCH_FRIEND_PROFILE,
});

export const displayResults = (resultList) => ({
  type: DISPLAY_RESULTS,
  resultList,
});

export const friendRequest = () => ({
  type: FRIEND_REQUEST,
});

export const friendToRequest = (friendId) => ({
  type: FRIEND_TO_REQUEST,
  friendId,
});
