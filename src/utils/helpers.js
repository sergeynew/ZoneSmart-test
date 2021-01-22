function capitalize (s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function dateToLocaleString (date_time_string, locale = 'ru-RU') {
    const date = new Date(date_time_string)
    return date.toLocaleDateString(locale)
}

function priceFormatter (currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    })
}

function formatPrice (amount) {
    return priceFormatter().format(amount)
}

export {
    capitalize,
    dateToLocaleString,
    formatPrice
}
