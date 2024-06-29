export function deleteUrlParam(key: string, value?: string) {
    const url = new URL(window.location.href);
    url.searchParams.delete(key, value);
    window.history.pushState({}, '', url.href);
}

export function setUrlParam(key: string, value: string) {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url.href);
}