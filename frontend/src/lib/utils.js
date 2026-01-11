export function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export function formatUsername(string) {
  // Check if the string is empty or invalid to prevent errors
    if (typeof string !== 'string' || string.length === 0) {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}
