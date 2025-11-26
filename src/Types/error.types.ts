import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface ErrorItemProps {
  apiError: FetchBaseQueryError | SerializedError | undefined;
}