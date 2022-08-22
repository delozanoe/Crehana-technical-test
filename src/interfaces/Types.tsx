type Continent = {
    name: string
}
type Lenguages = {
    name:string
}
type Country = {
    name: string,
    emoji: string,
    continent: Continent, 
    capital: string,
    currency: string,
    languages: Lenguages
}

export type {Country, Continent, Lenguages};