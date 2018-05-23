import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP,HTTPResponse } from '@ionic-native/http';
import { Platform } from 'ionic-angular';

/*
  Generated class for the HttpWrapperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpWrapperProvider {

  isApp;
  constructor(public http: HttpClient,public httpNative: HTTP,public platform: Platform) {
    if(this.platform.is('core') || this.platform.is('mobileweb')) {
      this.isApp = false;
    } else {
      this.isApp = true;
    }
  }

  /**
   * This returns an object representing a basic HTTP Authorization header of the form.
   * @param username {string} Username
   * @param password {string} Password
   * @returns {Object} an object representing a basic HTTP Authorization header of the form {'Authorization': 'Basic base64encodedusernameandpassword'}
   */
  getBasicAuthHeader(username: string, password: string): any{
    if(this.isApp){
      return this.httpNative.getBasicAuthHeader(username,password);
    }else{
      return {"Authorization": "Basic " + btoa(username + ":" + password)}
    }
  }
  username;
  password;
  /**
   * This sets up all future requests to use Basic HTTP authentication with the given username and password.
   * @param username {string} Username
   * @param password {string} Password
   */
  useBasicAuth(username: string, password: string): void{
    if(this.isApp){
      this.httpNative.useBasicAuth(username,password);
    }else{
      this.username = username;
      this.password = password;
    }
  }
  /**
   * Set a header for all future requests. Takes a header and a value.
   * @param header {string} The name of the header
   * @param value {string} The value of the header
   */
  setHeader(header: string, value: string): void{
    if(this.isApp){
      this.httpNative.setHeader(null,header,value);
    }
  }
  /**
   * Set the data serializer which will be used for all future POST and PUT requests. Takes a string representing the name of the serializer.
   * @param serializer {string} The name of the serializer. Can be urlencoded or json
   */
  setDataSerializer(serializer: string): void{
    if(this.isApp){
      this.httpNative.setDataSerializer(serializer);
    }
  };
  /**
   * Clear all cookies
   */
  clearCookies(): void{
    if(this.isApp){
      this.httpNative.clearCookies();
    }
  };
  /**
   * Remove cookies
   * @param url {string}
   * @param cb
   */
  removeCookies(url: string, cb: () => void): void{
    if(this.isApp){
      this.httpNative.removeCookies(url, cb);
    }
  };
  /**
   * Disable following redirects automatically
   * @param disable {boolean} Set to true to disable following redirects automatically
   */
  disableRedirect(disable: boolean): void{
    if(this.isApp){
      this.httpNative.disableRedirect(disable);
    }
  };
  /**
   * Set request timeout
   * @param timeout {number} The timeout in seconds. Default 60
   */
  setRequestTimeout(timeout: number): void{
    if(this.isApp){
      return this.httpNative.setRequestTimeout(timeout);
    }
  }
  /**
   * Enable or disable SSL Pinning. This defaults to false.
   *
   * To use SSL pinning you must include at least one .cer SSL certificate in your app project. You can pin to your server certificate or to one of the issuing CA certificates. For ios include your certificate in the root level of your bundle (just add the .cer file to your project/target at the root level). For android include your certificate in your project's platforms/android/assets folder. In both cases all .cer files found will be loaded automatically. If you only have a .pem certificate see this [stackoverflow answer](https://stackoverflow.com/questions/16583428/how-to-convert-an-ssl-certificate-in-linux/16583429#16583429). You want to convert it to a DER encoded certificate with a .cer extension.
   *
   * As an alternative, you can store your .cer files in the www/certificates folder.
   * @param enable {boolean} Set to true to enable
   * @returns {Promise<void>} returns a promise that will resolve on success, and reject on failure
   */
  enableSSLPinning(enable: boolean): Promise<void>{
    if(this.isApp){
      return this.httpNative.enableSSLPinning(enable);
    }
  }
  /**
   * Accept all SSL certificates. Or disabled accepting all certificates. Defaults to false.
   * @param accept {boolean} Set to true to accept
   * @returns {Promise<void>} returns a promise that will resolve on success, and reject on failure
   */
  acceptAllCerts(accept: boolean): Promise<void>{
    if(this.isApp){
      return this.httpNative.acceptAllCerts(accept);
    }
  }
  /**
   * Make a POST request
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that resolve on success, and reject on failure
   */
  post(url: string, body: any, headers: any): Promise<HTTPResponse>{
    if(this.isApp){
      return this.httpNative.post(url, body, headers);
    }else{
      return new Promise<HTTPResponse>((resolve, reject) => {
        headers["Authorization"] = this.getBasicAuthHeader(this.username, this.password)["Authorization"];
        this.http.post(url,body,{headers:headers,observe: 'response'}).subscribe((results:any)=>{

          resolve(this.convertResults(url,results));
        },(error)=>{
          reject(this.convertError(error))
        })
      })
    }
  }
  /**
   * Make a GET request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that resolve on success, and reject on failure
   */
  get(url: string, parameters: any, headers: any): Promise<HTTPResponse>{
    if(this.isApp){
      return this.httpNative.get(url, parameters, headers);
    }else{
      return new Promise<HTTPResponse>((resolve, reject) => {
        headers["Authorization"] = this.getBasicAuthHeader(this.username, this.password)["Authorization"];
        this.http.get(url,{headers:headers,observe: 'response',params:parameters}).subscribe((results:HTTPResponse)=>{

          resolve(this.convertResults(url,results));
        },(error)=>{
          reject(this.convertError(error))
        })
      })
    }
  }
  convertResults(url,results):HTTPResponse{
    var response:HTTPResponse={url:url,status: results.status,headers:results.headers,data: JSON.stringify(results.body)};
    return response;
  }
  convertError(error){
    const keys = error.headers.keys();
    let headers2 = {}
    keys.forEach(key => {
      console.log(error.headers[key]);
      headers2[key] = error.headers.get(key);
    });
    return {status: error.status,headers:headers2,error: error.message};
  }
  /**
   * Make a PUT request
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that resolve on success, and reject on failure
   */
  put(url: string, body: any, headers: any): Promise<HTTPResponse>{
    if(this.isApp){
      return this.httpNative.put(url, body, headers);
    }else{
      return new Promise<HTTPResponse>((resolve, reject) => {
        headers["Authorization"] = this.getBasicAuthHeader(this.username, this.password)["Authorization"];
        this.http.put(url,body,{headers:headers,observe: 'response'}).subscribe((results:any)=>{
          resolve(this.convertResults(url,results));
        },(error)=>{
          reject(this.convertError(error))
        })
      })
    }
  }
  /**
   * Make a PATCH request
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that resolve on success, and reject on failure
   */
  patch(url: string, body: any, headers: any): Promise<HTTPResponse>{
    if(this.isApp){
      return this.httpNative.patch(url, body, headers);
    }else{
      return new Promise<HTTPResponse>((resolve, reject) => {
        headers["Authorization"] = this.getBasicAuthHeader(this.username, this.password)["Authorization"];
        this.http.patch(url,body,{headers:headers,observe: 'response'}).subscribe((results:any)=>{
          resolve(this.convertResults(url,results));
        },(error)=>{
          reject(this.convertError(error))
        })
      })
    }
  }
  /**
   * Make a DELETE request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that resolve on success, and reject on failure
   */
  delete(url: string, parameters: any, headers: any): Promise<HTTPResponse>{
    if(this.isApp){
      return this.httpNative.delete(url, parameters, headers);
    }else{
      return new Promise<HTTPResponse>((resolve, reject) => {
        headers["Authorization"] = this.getBasicAuthHeader(this.username, this.password)["Authorization"];
        this.http.delete(url,{headers:headers,observe: 'response',params:parameters}).subscribe((results:any)=>{
          resolve(this.convertResults(url,results));
        },(error)=>{
          reject(this.convertError(error))
        })
      })
    }
  }
  /**
   * Make a HEAD request
   * @param url {string} The url to send the request to
   * @param parameters {Object} Parameters to send with the request
   * @param headers {Object} The headers to set for this request
   * @returns {Promise<HTTPResponse>} returns a promise that resolve on success, and reject on failure
   */
  head(url: string, parameters: any, headers: any): Promise<HTTPResponse>{
    if(this.isApp){
      return this.httpNative.head(url, parameters, headers);
    }else{
      return new Promise<HTTPResponse>((resolve, reject) => {
        headers["Authorization"] = this.getBasicAuthHeader(this.username, this.password)["Authorization"];
        this.http.head(url,{headers:headers,observe: 'response',params:parameters}).subscribe((results:any)=>{
          resolve(this.convertResults(url,results));
        },(error)=>{
          reject(this.convertError(error))
        })
      })
    }
  }
  /**
   *
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @param filePath {string} The local path of the file to upload
   * @param name {string} The name of the parameter to pass the file along as
   * @returns {Promise<HTTPResponse>} returns a promise that resolve on success, and reject on failure
   */
  uploadFile(url: string, body: any, headers: any, filePath: string, name: string): Promise<HTTPResponse>{
    if(this.isApp){
      return this.httpNative.uploadFile(url, body, headers, filePath, name);
    }else{
      return new Promise<HTTPResponse>((resolve, reject) => {
        //TODO add upload logic
      })
    }
  }
  /**
   *
   * @param url {string} The url to send the request to
   * @param body {Object} The body of the request
   * @param headers {Object} The headers to set for this request
   * @param filePath {string} The path to donwload the file to, including the file name.
   * @returns {Promise<HTTPResponse>} returns a promise that resolve on success, and reject on failure
   */
  downloadFile(url: string, body: any, headers: any, filePath: string): Promise<HTTPResponse>{
    if(this.isApp){
      return this.httpNative.downloadFile(url, body, headers, filePath);
    }else{
      //TODO add download loagic
    }
  }
}
