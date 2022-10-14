const TOASTER_DEFAULTS = {
  placement: 'top-right',
  autoDismiss: true
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export default class TOAST {
    static toastManager = null;

    static setToastManager(addToast) {
      TOAST.toastManager = addToast;
    }

    static _add(content, type, options = {}) {
      if (!TOAST.toastManager) {
        // eslint-disable-next-line
        alert(content);
        return;
      }
      TOAST.toastManager(content, {
        ...TOASTER_DEFAULTS,
        ...options,
        appearance: type || TOAST_TYPES.ERROR
      });
    }

    static ok(content, options = {}) {
      // eslint-disable-next-line
      TOAST._add(content, TOAST_TYPES.SUCCESS, {
        autoDismiss: true,
        ...options
      });
    }

    static error(content, type, options = {}) {
      // eslint-disable-next-line
      TOAST._add(content, TOAST_TYPES.ERROR, {
        autoDismiss: true,
        ...options
      });
    }

    static info(content, type, options = {}) {
      // eslint-disable-next-line
      TOAST._add(content, TOAST_TYPES.INFO, {
        autoDismiss: true,
        ...options
      });
    }
}
