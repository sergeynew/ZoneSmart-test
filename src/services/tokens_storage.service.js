export const TokensStorageService = {
    setTokens,
    setAccessToken,
    getAccessToken,
    getRefreshToken,
    clearTokens
}

function setTokens (tokens) {
    localStorage.setItem('access_token', tokens.access)
    localStorage.setItem('refresh_token', tokens.refresh)
}

function setAccessToken (accessToken) {
    localStorage.setItem('access_token', accessToken)
}

function getAccessToken () {
    return localStorage.getItem('access_token')
}

function getRefreshToken () {
    return localStorage.getItem('refresh_token')
}

function clearTokens () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
}
