import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http:HttpClient) {}

getProduct(){
  return this.http.get<any>("https://api.coinbase.com/v2/currencies/");
}

getrandomuser(){
  return this.http.get<any>("https://randomuser.me/api/");
}

getimage(){
  return this.http.get<any>("https://random.dog/woof.json");
}

postProduct(data : any){
  return this.http.post<any>("http://localhost:3000/productList/",data);
}
getProductt(){
  return this.http.get<any>("http://localhost:3000/productList/");
}
putProduct(data:any,id :number){
  return this.http.put<any>("http://localhost:3000/productList/"+id,data);
}
deleteProduct(id:number){
  return this.http.delete<any>("http://localhost:3000/productList/"+id);
}

}
