import { PaletteMode } from "@mui/material";
import { ORDER } from "shared/business/common";

export enum THEME {
    LIGHT = 'light',
    DARK = 'dark'
}

export type ConfigProps = {
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    navType: PaletteMode;
    container: boolean;
};

export type PaginationOption = {
    order: ORDER;
    page: number;
    query: string;
    sortColumn: string;
    take: number;
};

export type PaginationMeta = {
    page?: number;
    take?: number;
    itemCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
};

export const DefaultPagination: PaginationOption = {
    order: ORDER.ASC,
    page: 1,
    take: 10,
    sortColumn: "",
    query: "",
};

export const ConfigTheme: ConfigProps = {
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: "light", // light, dark
    container: false,
};
