export const DISTRIBUTION_ACTIONS = {
ATTEMPT_TO_FETCH_DISTRIBUTION: 'dashboard/@HOSPICE/ATTEMPT_TO_FETCH_DISTRIBUTION',
SET_FETCH_DISTRIBUTION_SUCCEED: 'dashboard/@HOSPICE/SET_FETCH_DISTRIBUTION_SUCCEED',
SET_FETCH_DISTRIBUTION_FAILURE: 'dashboard/@HOSPICE/SET_FETCH_DISTRIBUTION_FAILURE',
RESET_FETCH_DISTRIBUTION_STATE: 'dashboard/@HOSPICE/RESET_FETCH_DISTRIBUTION_STATE',

ATTEMPT_TO_CREATE_DISTRIBUTION: 'dashboard/@HOSPICE/ATTEMPT_TO_CREATE_DISTRIBUTION',
SET_CREATE_DISTRIBUTION_SUCCEED: 'dashboard/@HOSPICE/SET_CREATE_DISTRIBUTION_SUCCEED',
SET_CREATE_DISTRIBUTION_FAILURE: 'dashboard/@HOSPICE/SET_CREATE_DISTRIBUTION_FAILURE',
RESET_CREATE_DISTRIBUTION_STATE: 'dashboard/@HOSPICE/RESET_CREATE_DISTRIBUTION_STATE',

ATTEMPT_TO_UPDATE_DISTRIBUTION: 'dashboard/@HOSPICE/ATTEMPT_TO_UPDATE_DISTRIBUTION',
SET_UPDATE_DISTRIBUTION_SUCCEED: 'dashboard/@HOSPICE/SET_UPDATE_DISTRIBUTION_SUCCEED',
SET_UPDATE_DISTRIBUTION_FAILURE: 'dashboard/@HOSPICE/SET_UPDATE_DISTRIBUTION_FAILURE',
RESET_UPDATE_DISTRIBUTION_STATE: 'dashboard/@HOSPICE/RESET_UPDATE_DISTRIBUTION_STATE',

ATTEMPT_TO_DELETE_DISTRIBUTION: 'dashboard/@HOSPICE/ATTEMPT_TO_DELETE_DISTRIBUTION',
SET_DELETE_DISTRIBUTION_SUCCEED: 'dashboard/@HOSPICE/SET_DELETE_DISTRIBUTION_SUCCEED',
SET_DELETE_DISTRIBUTION_FAILURE: 'dashboard/@HOSPICE/SET_DELETE_DISTRIBUTION_FAILURE',
RESET_DELETE_DISTRIBUTION_STATE: 'dashboard/@HOSPICE/RESET_DELETE_DISTRIBUTION_STATE'

}
//FETCH Distribution
export const attemptToFetchDistribution =  (data: Object): BaseAction  => ({
    type: DISTRIBUTION_ACTIONS.ATTEMPT_TO_FETCH_DISTRIBUTION,
    payload: data
  });
  export const setFetchDistributionSucceed = (payload: Object): BaseAction => ({
    type: DISTRIBUTION_ACTIONS.SET_FETCH_DISTRIBUTION_SUCCEED,
    payload
  });
  
  export const setFetchDistributionFailure = (payload: Object): BaseAction => ({
    type: DISTRIBUTION_ACTIONS.SET_FETCH_DISTRIBUTION_FAILURE,
    payload
  });
  export const resetFetchDistributionState = (): BaseAction => ({
    type: DISTRIBUTION_ACTIONS.RESET_FETCH_DISTRIBUTION_STATE
  });

//CREATE Distribution
export const attemptToCreateDistribution =  (data: Object): BaseAction  => ({
  type: DISTRIBUTION_ACTIONS.ATTEMPT_TO_CREATE_DISTRIBUTION,
  payload: data
});
export const setCreateDistributionSucceed = (payload: Object): BaseAction => ({
  type: DISTRIBUTION_ACTIONS.SET_CREATE_DISTRIBUTION_SUCCEED,
  payload
});

export const setCreateDistributionFailure = (payload: Object): BaseAction => ({
  type: DISTRIBUTION_ACTIONS.SET_CREATE_DISTRIBUTION_FAILURE,
  payload
});
export const resetCreateDistributionState = (): BaseAction => ({
  type: DISTRIBUTION_ACTIONS.RESET_CREATE_DISTRIBUTION_STATE
});

//UPDATE Distribution
export const attemptToUpdateDistribution =  (data: Object): BaseAction  => ({
  type: DISTRIBUTION_ACTIONS.ATTEMPT_TO_UPDATE_DISTRIBUTION,
  payload: data
});
export const setUpdateDistributionSucceed = (payload: Object): BaseAction => ({
  type: DISTRIBUTION_ACTIONS.SET_UPDATE_DISTRIBUTION_SUCCEED,
  payload
});

export const setUpdateDistributionFailure = (payload: Object): BaseAction => ({
  type: DISTRIBUTION_ACTIONS.SET_UPDATE_DISTRIBUTION_FAILURE,
  payload
});
export const resetUpdateDistributionState = (): BaseAction => ({
  type: DISTRIBUTION_ACTIONS.RESET_UPDATE_DISTRIBUTION_STATE
});

//DELETE Distribution
export const attemptToDeleteDistribution =  (data: Object): BaseAction  => ({
  type: DISTRIBUTION_ACTIONS.ATTEMPT_TO_DELETE_DISTRIBUTION,
  payload: data
});
export const setDeleteDistributionSucceed = (payload: Object): BaseAction => ({
  type: DISTRIBUTION_ACTIONS.SET_DELETE_DISTRIBUTION_SUCCEED,
  payload
});

export const setDeleteDistributionFailure = (payload: Object): BaseAction => ({
  type: DISTRIBUTION_ACTIONS.SET_DELETE_DISTRIBUTION_FAILURE,
  payload
});
export const resetDeleteDistributionState = (): BaseAction => ({
  type: DISTRIBUTION_ACTIONS.RESET_DELETE_DISTRIBUTION_STATE
});
