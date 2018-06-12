import { Component, OnInit } from "@angular/core"
import { User, Country, City } from "@app/moduls/index"
import { AppService } from "@app/services/index"

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  user: User
  country: Country
  city: City
  countries: Country[]
  all_cities: City[]
  cities: City[]
  password_1: string
  password_2: string
  errors: string
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.user = new User()
    this.getOptions()
    this.all_cities = this.cities
  }

  onSubmit() {
    this.user.city = this.city
    this.user.password = this.password_1
    this.setUser()
  }

  onKey(value) {
    if (this.password_1 !== value) {
      this.errors = "Invalid confirm password!"
      console.log(this.errors)
    }
  }
  setUser() {
    this.appService.postObject("users/", this.user, "users").subscribe()
  }
  getOptions() {
    this.appService
      .getObject("cities/", "cities")
      .subscribe(cities => (this.cities = cities))
    this.appService
      .getObject("countries/", "countries")
      .subscribe(countries => (this.countries = countries))
  }
  loadCities() {
    this.cities = this.all_cities.filter(x => this.country.id == x.country.id)
    console.log(this.cities)
  }
}
