
export const fetcher = (url) => fetch(url).then((res) => res.json());

export const cap = (str) => str.split('_').map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' ')

export const formatCardName = (x) => {
    // const promo = promoRarity[x.col]
    const rarity = new Array(x.level + 1).join('⭐')
    return `${rarity} ${cap(x.name)} [${x.col}]`
}
