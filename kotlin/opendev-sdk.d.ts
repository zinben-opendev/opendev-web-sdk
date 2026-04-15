/**
 * OpenDev SDK for JavaScript/TypeScript
 * Built with Kotlin/Wasm（宿主应用集成）
 *
 * @packageDocumentation
 */

declare module '@opendev/sdk' {
  /**
   * Runtime environment for the SDK
   */
  export enum Environment {
    /** Development environment */
    DEVELOPMENT = 'DEVELOPMENT',
    /** Staging/Testing environment */
    STAGING = 'STAGING',
    /** Production environment */
    PRODUCTION = 'PRODUCTION'
  }

  /**
   * Authentication methods supported by the SDK
   */
  export enum LoginMethod {
    /** Google Sign-In */
    GOOGLE = 'GOOGLE',
    /** Facebook Login */
    FACEBOOK = 'FACEBOOK',
    /** Apple Sign-In */
    APPLE = 'APPLE',
    /** WeChat Login */
    WECHAT = 'WECHAT'
  }

  /**
   * SDK configuration options
   */
  export interface PlatformConfig {
    /** Base URL for SDK resources */
    cdnBaseUrl: string;
    /** Authentication token for CDN */
    cdnToken: string;
    /** Optional channel identifier */
    channelKey?: string;
    /** Runtime environment */
    environment: Environment;
  }

  /**
   * User information returned after authentication
   */
  export interface User {
    /** Unique user identifier */
    id: string;
    /** User's display name */
    username?: string;
    /** User's email address */
    email?: string;
    /** URL to user's avatar image */
    avatar?: string;
    /** Authentication provider used */
    provider?: LoginMethod;
    /** Timestamp of last login */
    lastLoginAt?: number;
  }

  /**
   * Authentication result
   */
  export interface AuthResult {
    /** Whether authentication was successful */
    success: boolean;
    /** Authenticated user (if successful) */
    user?: User;
    /** Error message (if failed) */
    error?: string;
    /** Error code (if failed) */
    errorCode?: string;
  }

  /**
   * SDK initialization result
   */
  export interface InitResult {
    /** Whether initialization was successful */
    success: boolean;
    /** SDK version */
    version: string;
    /** Error message (if failed) */
    error?: string;
  }

  /**
   * Main OpenDev SDK interface
   */
  export interface IOpenDevSDK {
    /**
     * Initialize the SDK with configuration
     * @param config - SDK configuration options
     * @returns Promise resolving to initialization result
     */
    initialize(config: PlatformConfig): Promise<InitResult>;

    /**
     * Authenticate user with specified method
     * @param method - Authentication method to use
     * @returns Promise resolving to authenticated user
     */
    login(method: LoginMethod): Promise<User>;

    /**
     * Sign out current user
     * @returns Promise resolving when logout is complete
     */
    logout(): Promise<void>;

    /**
     * Get currently authenticated user
     * @returns Current user or null if not authenticated
     */
    getCurrentUser(): User | null;

    /**
     * Check if SDK is initialized
     * @returns true if SDK is initialized
     */
    isInitialized(): boolean;

    /**
     * Get SDK version
     * @returns SDK version string
     */
    getVersion(): string;
  }

  /**
   * OpenDev SDK singleton instance
   */
  export const OpenDevSDK: IOpenDevSDK;

  /**
   * Get SDK instance (alternative to direct import)
   * @returns OpenDev SDK instance
   */
  export function getSDK(): IOpenDevSDK;

  // Default export
  export default OpenDevSDK;
}
