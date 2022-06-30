export function formatDate(avaiableAt: Date) {
    const formatedDateTimeString = new Intl.DateTimeFormat("pt-BR", {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'America/Sao_Paulo'
    }).format(new Date(avaiableAt))
    .replace(/,/g, " •")
    .replace(/([0-9]{2}):([0-9]{2})/g, '• $1h:$2');

    return formatedDateTimeString;
}