/* eslint-disable max-len */
import { connect } from 'react-redux';
import defaultStoreContext from '../common/contexts/defaultStoreContext';

/**
 * This wrapper is useful for connecting to global store by the same way as normal react-redux connect
 * @param {Function} mapState - similar to mapStateToProps
 * @param {Function| Null} mapDispatch - similar to mapDispatchToProps
 * @returns {Function} - react-redux's connect
 */
export default (mapState, mapDispatch = null) => connect(
  mapState,
  mapDispatch,
  null,
  { context: defaultStoreContext }
);
