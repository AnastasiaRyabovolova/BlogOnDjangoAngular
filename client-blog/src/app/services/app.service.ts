import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, of, from, throwError } from "rxjs"
import { catchError, map, tap } from "rxjs/operators"

import { User } from "@app/moduls/index"
import { Board } from "@app/moduls/index"
import {
  BaseRequestOptions,
  Headers,
  Request,
  RequestMethod,
} from "@angular/http"
import { LocalstorageService } from "./localstorage.service"

@Injectable({
  providedIn: "root",
})
export class AppService {
  private host = "localhost:8000/"
  private headers: any = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  }

  constructor(private http: HttpClient, private ls: LocalstorageService) {}

  getObject(url: string, key: string): Observable<any> {
    let items = this.ls.get(key)
    if (items !== null) {
      return of(items)
    }
    let response = this.http.get<any>("http://" + this.host + url, this.headers)
    response.subscribe(data => {
      this.ls.setPages(key, data)
    })
    return response
  }

  getPaginationObject(url: string, page: number, key: string): Observable<any> {
    let items = this.ls.get(key)
    if (items !== null) {
      let keys = Object.keys(items)
      if (page in items) {
        return of(items[page])
      }
    }
    let response = this.http
      .get<any>("http://" + this.host + url + "?page=" + page, this.headers)
      .pipe(
        tap(data => {
          if (items === null) {
            items = { [page]: data }
          } else {
            items[page] = data
          }
          this.ls.set(key, items)
        }),

        map(val => val),
      )
    return response
  }

  postObject(url: string, object: Object, key: string): Observable<any> {
    let response = this.http
      .post<any>("http://" + this.host + url, object, this.headers)
      .pipe(
        tap(res => {
          let items = this.ls.get(key)
          if (items !== null) {
            items.push(res)
            this.ls.set(key, items)
          }
        }),
      )
    return response
  }

  patchObject(url: string, object: any, key: string): Observable<any> {
    let response = this.http.patch<any>(
      "http://" + this.host + url,
      object,
      this.headers,
    )
    let items = this.ls.get(key)
    items = items.filter(x => object.id !== x.id)
    items.push(object)
    this.ls.set(key, items)

    return response
  }

  deleteObject(url: string, key: string): Observable<any> {
    this.ls.del(url)
    let items = this.ls.get(key)
    let id = url.split("/")
    let del_id = id[id.length - 2]
    items = items.filter(x => +del_id !== x.id)
    this.ls.set(key, items)
    let response = this.http.delete<any>(
      "http://" + this.host + url,
      this.headers,
    )
    return response
  }

  logout() {
    this.ls.del("user")
    this.ls.del("token")
    this.headers = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
  }

  setToken(url: string, object: Object): Observable<any> {
    let request = this.http
      .post<any>("http://" + this.host + url, object, this.headers)
      .pipe(
        tap(token => {
          this.ls.set("token", token)
        }),
      )
    return request
  }

  setUser(token: any, user: User): Observable<any> {
    let url = "users/getcurrent/"
    token = this.getToken()
    this.headers = {
      headers: new HttpHeaders({
        Authorization: "Token " + token,
        "Content-Type": "application/json",
      }),
    }
    return this.http.get<any>("http://" + this.host + url, this.headers).pipe(
      tap(user => {
        this.ls.set("user", user)
      }),
    )

    // .subscribe(full_user => {
    //   this.ls.set("user", full_user)
    // })
  }

  getToken() {
    let items = this.ls.get("token")

    if (items !== null) {
      return items["token"]
    }
    return null
  }

  getUser(): Observable<any> {
    let items = this.ls.get("user")
    if (items !== null) {
      return of(items[0])
    }
    return of(null)
  }

  // errroHandler(error: HttpErrorResponse) {
  //   return Observable.throwError(error.message || "Server Error")
  // }
}
