import { AxiosRequestConfig } from 'axios';

interface RequestProps extends AxiosRequestConfig {
  params?: Record<string, unknown>;
}
