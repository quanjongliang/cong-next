import { en, vi } from "locales/translation";
import { AUTH_TRANSLATED } from "locales/auth/auth-enum";
import { WELCOME_TRANSLATED } from "locales/welcome/welcome-enum";
import { SIDEBAR_TRANSLATED } from "locales/sidebar/sidebar-enum";
import { PATTERN_TRANSLATED } from "locales/pattern/pattern-enum";
import { COMMON_TRANSLATED } from "locales/common/common-enum";
import { FILTER_BOARD_TRANSLATED } from "locales/filter-board/filter-board-enum";
import { VA_REQUEST_TRANSLATED } from "locales/va-request/va-request-enum";
import { VA_INDIVIDUAL_TRANSLATED } from "locales/va-individual/va-individual-enum";

export enum LANGUAGE {
    EN = 'en',
    VI = 'vi'
}

export const SUPPORTED_LANG: { [key in LANGUAGE]: string } = {
    [LANGUAGE.VI]: "Vietnamese",
    [LANGUAGE.EN]: "English",
};

export const translations = {
    [LANGUAGE.VI]: vi,
    [LANGUAGE.EN]: en,
};

export type LANGUAGE_TRANSLATED =
    | AUTH_TRANSLATED
    | WELCOME_TRANSLATED
    | SIDEBAR_TRANSLATED
    | PATTERN_TRANSLATED
    | COMMON_TRANSLATED
    | FILTER_BOARD_TRANSLATED | VA_REQUEST_TRANSLATED
    | VA_INDIVIDUAL_TRANSLATED

export interface TranslateProps {
    lang: LANGUAGE;
    translations: {
        [key in LANGUAGE]: {
            [key in LANGUAGE_TRANSLATED]: string;
        };
    };
}

export type TranslateKeyedObject = {
    [key in LANGUAGE_TRANSLATED]: string;
};