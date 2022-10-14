/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import type { Node } from 'react';


export default (Consumer): Function => (Component: Node): Function => (props): Node => (
  <Consumer>
    {roleConfigContext => <Component {...props} roleConfig={roleConfigContext} />}
  </Consumer>
);

// This is an explanation of the arrow hell above
// function withContext(Consumer): Function {
//   return function ComponentAlreadyBoundedWithContext(Component: Node): Function {
//     return function ComponentBoundWithRoleConfigContext(props): Node {
//       return (
//         <Consumer>
//           {roleConfigContext => <Component {...props} roleConfig={roleConfigContext} />}
//         </Consumer>
//       );
//     };
//   };
// }
