import { RECEIVED, FAILED, UPDATED, FETCH } from './action';

export default function factoryReducer(
  state = {
    isFetching: true,
    isFailed: false,
    isInitialFetched: false,
    data: {},
  },
  action
) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        isFetching: true,
        isFailed: false,
      };
    case RECEIVED:
    case UPDATED:
      return {
        ...state,
        data: action.payload.data,
        isFetching: false,
        isFailed: false,
        isInitialFetched: true,
      };
    case FAILED:
      return {
        ...state,
        isFetching: false,
        isFailed: true,
      };
    default:
      return state;
  }
}
