export class Country {
  id: number
  name: string
}

export class City {
  id: number
  name: string
  country: Country
}
