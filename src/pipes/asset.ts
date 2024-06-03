import { useAuth } from "../services";

export function assetsFilter(value: string): string {
    return useAuth().assetUri(value) ?? '';
}
