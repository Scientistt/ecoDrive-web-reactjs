export function isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isUsernameValid(username: string): boolean {
    const usernameRegex = /^[a-z._]+$/;
    return usernameRegex.test(username);
}

export function isSlugValid(slug: string): boolean {
    const slugRegex = /^[a-z-]+$/;
    return slugRegex.test(slug);
}
