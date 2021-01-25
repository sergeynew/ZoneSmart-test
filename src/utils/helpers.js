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

function getEndingsForNumeral (number, titles) {
    const cases = [2, 0, 1, 1, 1, 2]
    if (number % 100 > 4 && number % 100 < 20) {
        return titles[2]
    }
    if (number % 10 < 5) {
        return titles[cases[number % 10]]
    }
    return titles[cases[5]]
}

function formatPrice (amount) {
    return priceFormatter().format(amount)
}

export {
    capitalize,
    dateToLocaleString,
    formatPrice,
    getEndingsForNumeral
}
