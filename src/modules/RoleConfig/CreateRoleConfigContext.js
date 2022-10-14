// flow

/**
 * @see https://reactjs.org/docs/context.html#reactcreatecontext
 */

import { createContext } from 'react';
import type { Context } from 'react';

import withContext from './withContext';

export type RoleConfigContextValue = {
  role: string,
  actions: Object;
  global_styles: Object
}

/*  The defaultValue argument is only used when a component does not have a
    matching Provider above it in the tree. This can be helpful for testing
    components in isolation without wrapping them.
    Note: passing undefined
    as a Provider value does not cause consuming components to use defaultValue.
*/
const initialContext = {
  role: 'TEST',
  services: {
    test: {
      actions: {
        add: {
          allowed: false,
          styles: {
          }
        },
        see: {
          allowed: false,
          styles: {}
        },
        edit: {
          allowed: false,
          styles: {}
        },
        delete: {
          allowed: false,
          styles: {}
        }
      }
    }
  },
  global_styles: {
  }
};

/**
 *  Creates a Context object. When React renders a component
 *  that subscribes to this Context object it will read the
 *  current context value from the closest matching Provider
 *  above it in the tree.
 * @param {Object} initial - default value of context
 * @return {Object} Provider, Consumer, withRoleConfigContext
 */
function CreateRoleConfigContext(initial: RoleConfigContextValue = initialContext): Context {
  const context = createContext(initial);
  context.displayName = 'RoleConfigContext';

  /*
    maybe this can be useful, for dynamically create actions or change styles etc..
    It must take into consideration that context change process must be asynchronous,
    to avoid re rendering processe's blocking */
  /* context.createAction = function (action) {
    this.actions = {
      ...this.actions,
      ...action
    };
  }; */

  return {
    RoleConfigContextProvider: context.Provider,
    RoleConfigContext: context,
    withRoleConfigContext: withContext(context.Consumer)
  };
}


export default CreateRoleConfigContext;
