import { createSelector } from 'reselect';

/**
 * get Auth State
 * @param {Object} state - state
 * @param {Object} props - required props from state
 * @returns {Object} props
 */
const getUploadState = (state) => state.media.upload;

export const mediaUploadErrorSelector = createSelector(
  getUploadState,
  upload => upload.error
);

export const mediaUploadStatusSelector = createSelector(
  getUploadState,
  upload => upload.status
);


export const mediaUploadedUrlSelector = createSelector(
    getUploadState,
    upload => upload.s3_url
  );

const getGeneralUploadState = (state) => state.media;

export const mediaReducerSelector = (state, reducerKey) => createSelector(
  getGeneralUploadState,
  uploadReducer => reducerKey ? uploadReducer[reducerKey] : uploadReducer
)(state, reducerKey);
