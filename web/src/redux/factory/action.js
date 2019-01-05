import { FactoryService } from '../../service';

// Actions
export const FAILED = 'factory/FAILED';
export const RECEIVED = 'factory/RECEIVED';
export const UPDATED = 'factory/UPDATED';
export const FETCH = 'factory/FETCH';

export const getFactory = id => async dispatch => {
  dispatch(fetch());

  try {
    const response = await FactoryService.get(id);
    const factory = response.data;
    dispatch(receivedFactory(factory));
  } catch (error) {
    console.error(error);
    dispatch(receivedFail(error));
  }
};

export const fetch = () => ({
  type: FETCH,
  payload: {},
});

export const receivedFail = () => ({
  type: FAILED,
  payload: {},
});

export const receivedFactory = data => ({
  type: RECEIVED,
  payload: { data },
});
