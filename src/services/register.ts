import { getCurrentInstance, inject, type App, type Plugin, type InjectionKey } from 'vue';
import type { IHttpClient } from "./types";
import { HttpClient } from "./http";
import { EncryptorService } from './encryptor';
import { CookieService } from './cookie';
import { CacheService } from './cache';
import { AuthService } from './auth';
import { ThemeService } from './theme';
import { WebAuthn } from './webAuthn';

const httpInjectionKey: InjectionKey<string> = Symbol('httpclient');
const encryptorInjectionKey: InjectionKey<string> = Symbol('encryptor');
const cookieInjectionKey: InjectionKey<string> = Symbol('cookie');
const cacheInjectionKey: InjectionKey<string> = Symbol('cache');
const authInjectionKey: InjectionKey<string> = Symbol('auth');
const themeInjectionKey: InjectionKey<string> = Symbol('theme');

export function useHttp(): IHttpClient {
    return getCurrentInstance()
        ? inject<IHttpClient>(httpInjectionKey, new HttpClient())
        : new HttpClient();
}

export function useEncryptor(): EncryptorService {
    return getCurrentInstance()
    ? inject<EncryptorService>(encryptorInjectionKey, new EncryptorService())
    : new EncryptorService();
}

export function useCookie(): CookieService {
    return getCurrentInstance()
    ? inject<CookieService>(cookieInjectionKey, new CookieService())
    : new CookieService();;
}

export function useCache(): CacheService {
    return getCurrentInstance()
    ? inject<CacheService>(cacheInjectionKey, new CacheService())
    : new CacheService();;
}

export function useAuth(): AuthService {
    return getCurrentInstance()
    ? inject<AuthService>(authInjectionKey, new AuthService())
    : new AuthService();;
}

export function useTheme(): ThemeService {
    return getCurrentInstance()
    ? inject<ThemeService>(themeInjectionKey, new ThemeService())
    : new ThemeService();;
}

export function useWebAuthn(): WebAuthn {
    return new WebAuthn();
}

export function createSerive(): Plugin {
    return (app: App) => {
        app.provide<IHttpClient>(httpInjectionKey, new HttpClient())
        .provide<EncryptorService>(encryptorInjectionKey, new EncryptorService())
        .provide<CookieService>(cookieInjectionKey, new CookieService())
        .provide<CacheService>(cacheInjectionKey, new CacheService())
        .provide<AuthService>(authInjectionKey, new AuthService())
        .provide<ThemeService>(themeInjectionKey, new ThemeService())
        ;
    };
}