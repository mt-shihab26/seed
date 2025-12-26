export const formatInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');

    if (names.length === 0) return '';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
};

export const formatDateTime = (dateString: string | null | undefined): string => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    const displayHours = date.getHours() % 12 || 12;
    return `${day} ${month} ${year}, ${displayHours}:${minutes} ${ampm}`;
};
