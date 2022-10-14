/* eslint-disable arrow-body-style */
import { DEFAULT_ERROR } from './constants';

export const handleSagaError = (err) => {
  return err || DEFAULT_ERROR;
};
