declare namespace NodeJS {
  interface ProcessEnv {
    SECRET_KEY: string; // Your JWT secret key
    SECRET_KEY_REFRESH: string;
    JWT_EXPIRATION: string; // Expiration time for JWTs (e.g., "1h", "7d")
    JWT_EXPIRATION_REFRESH: string;
    JWT_EXPIRATION_PASSWORD: string;
    GOOGLE_CLIENT_ID: string; // Google OAuth client ID
    GOOGLE_CLIENT_SECRET: string; // Google OAuth client secret
    REDIRECT_URL_GOOGLE: string; // Google OAuth redirect URI
    DISCORD_CLIENT_ID: string; // Discord OAuth client ID
    DISCORD_CLIENT_SECRET: string; // Discord OAuth client secret
    REDIRECT_URL_DISCORD: string; // Discord OAuth redirect URI
    DB_USER: string; // Database username
    DB_PASSWORD: string; // Database password
    DB_HOST: string; // Database host
    DB_PORT: string; // Database port
    DB_NAME: string; // Database name
    DB_KEY: string; // Database name
    LOW_MET: number;
    MED_MET: number;
    HIGH_MET: number;
    SCW_ACCESS_KEY: string; // Access key for Scaleway
    SCW_SECRET_KEY: string; // Secret key for Scaleway
    SCW_DEFAULT_ORGANIZATION_ID: string; //  organization ID Scaleway
    SCW_DEFAULT_PROJECT_ID: string; // Scaleway project ID
  }
}
