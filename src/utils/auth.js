export function setSessionToken(token) {
    sessionStorage.setItem('token', token);
}

export function getSessionToken() {
    return sessionStorage.getItem('token');
}

export function isAuthenticated() {
    return !!getSessionToken();
}
