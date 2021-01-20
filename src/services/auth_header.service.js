import { LocalStorageService } from './local_storage.service'

export function authHeader () {
    const accessToken = LocalStorageService.getAccessToken();
    if (accessToken) {
        return { Authorization: `JWT ${accessToken}` };
    }
    return {};
}
