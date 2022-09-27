import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  url: string = environment.API_URL_INV

  constructor(private http: HttpClient) { }

  //#region Servicio Agregar/Listar/Eliminar Task
  fnServiceTask(nOpcion: number, pParametro: any): Observable<any> {
    const urlEndPoint = this.url + 'api/Task';
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    const params = {
      nOpcion: nOpcion,
      pParametro: pParametro.join('|')
    };

    return this.http.post(urlEndPoint, JSON.stringify(params), { headers: httpHeaders });
  }
  //#endregion


}
