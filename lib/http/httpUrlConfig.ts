export let baseUrl = process.env.APP_API_GATEWAY_URL || 'https://localhost/3000';
if (baseUrl.endsWith('/')) {
  // Take the base url
  baseUrl = baseUrl.slice(0, -1);
}

export namespace config {
  export class urls {
    public static authenticationService = process.env.APP_AUTHENTICATION_SERVICE_URL || `${baseUrl}/auth/vendor`;
    public static auditsService = process.env.APP_AUDITS_SERVICE_URL || `${baseUrl}/audits/`;
    public static metadataService = process.env.APP_METADATA_SERVICE_URL || `${baseUrl}/metadata/`;
    public static eventService = process.env.APP_EVENT_SERVICE_URL || `${baseUrl}/event`;
    public static identityService = process.env.APP_IDENTITY_SERVICE_URL || `${baseUrl}/identity`;
    public static vendorsService = process.env.APP_VENDORS_SERVICE_URL || `${baseUrl}/vendors`;
    public static oauthService = process.env.APP_OAUTH_SERVICE_URL || `${baseUrl}/oauth`;
    public static entitlementsService = process.env.APP_ENTITLEMENTS_SERVICE_URL || `${baseUrl}/entitlements`;
  }
}