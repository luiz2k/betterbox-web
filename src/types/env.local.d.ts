declare namespace NodeJS {
  interface ProcessEnv {
    TMDB_AUTHORIZATION: string;
    API_BASE_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
  }
}
