declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
    readonly REACT_APP_API_BASE_URL: string;
    readonly REACT_APP_API_POSTFIX: string;
    readonly REACT_APP_MSW: 'off' | 'on';
  }
}
