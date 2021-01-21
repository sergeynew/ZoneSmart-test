function capitalize (s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function dateToLocaleString (dateTimeString, locale = 'ru-RU') {
    const date = new Date(dateTimeString)
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
