import { ProviderContext } from 'notistack';

let snackbarRef: ProviderContext | null = null;

export const setSnackbarRef = (ref: ProviderContext) => {
  snackbarRef = ref;
};

export const showSuccess = (message: string) => {
  snackbarRef?.enqueueSnackbar(message, { variant: 'success' });
};

export const showError = (message: string) => {
  snackbarRef?.enqueueSnackbar(message, { variant: 'error' });
};
