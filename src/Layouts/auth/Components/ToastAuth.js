import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import TOAST from '../../../modules/toastManager';
type Props = {
  
}


  function ToastAuth({inbox123}: Props) {
    const { addToast } = useToasts();
    
    useEffect(() => {
      TOAST.setToastManager(addToast);
    }, []);
    


  return (
<div></div>  
)
  }    
export default ToastAuth;