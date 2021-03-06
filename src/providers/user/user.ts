import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { HTTP } from '@ionic-native/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientProvider } from '../http-client/http-client';
import { CurrentUser } from '../../models/currentUser';
import { EncryptionProvider } from '../encryption/encryption';

/*
 Generated class for the UserProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserProvider {
  constructor(
    public storage: Storage,
    public http: HTTP,
    private httpProvider: HttpClientProvider,
    private encryptionProvider: EncryptionProvider
  ) {}

  /**
   *
   * @param user
   * @returns {Observable<any>}
   */
  getUserDataFromServer(user, withBaseUrl: boolean = false): Observable<any> {
    this.http.useBasicAuth(user.username, user.password);
    let fields =
      'fields=[:all],organisationUnits[id,name],dataViewOrganisationUnits[id,name],userCredentials[userRoles[name,dataSets[id],programs[id]],programs,dataSets';
    let url = user.serverUrl.split('/dhis-web-')[0];
    url = url.split('/api/apps')[0];
    user.serverUrl = url;
    url += '/api/me.json?' + fields;
    let apiurl = url;
    if (withBaseUrl) {
      apiurl = this.httpProvider.getUrlBasedOnDhisVersion(url, user);
    }
    return new Observable(observer => {
      this.http
        .get(apiurl, {}, {})
        .then(
          (data: any) => {
            if (data.data.indexOf('login.action') > -1) {
              user.serverUrl = user.serverUrl.replace('http://', 'https://');
              this.getUserDataFromServer(user).subscribe(
                (data: any) => {
                  const url = user.serverUrl.split('/dhis-web-')[0];
                  user.serverUrl = url;
                  observer.next({ data: data.data, user: user });
                  observer.complete();
                },
                error => {
                  observer.error(error);
                }
              );
            } else {
              observer.next({ data: data.data, user: user });
              observer.complete();
            }
          },
          error => {
            observer.error(error);
          }
        )
        .catch(error => {
          observer.error(error);
        });
    });
  }

  /**
   *
   * @param user
   * @returns {Observable<any>}
   */
  getUserAuthorities(user): Observable<any> {
    this.http.useBasicAuth(user.username, user.password);
    let fields = 'fields=authorities,id,name,dataViewOrganisationUnits';
    let url = user.serverUrl;
    url += '/api/me.json?' + fields;
    if (user.dhisVersion && parseInt(user.dhisVersion) > 25) {
      url = url.replace('/api', '/api/' + user.dhisVersion);
    }
    return new Observable(observer => {
      this.http
        .get(url, {}, {})
        .then(
          (response: any) => {
            observer.next(JSON.parse(response.data));
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        )
        .catch(error => {
          observer.error(error);
        });
    });
  }

  /**
   *
   * @param user
   * @returns {Observable<any>}
   */
  authenticateUser(user): Observable<any> {
    this.http.useBasicAuth(user.username, user.password);
    return new Observable(observer => {
      this.http
        .get(user.serverUrl + '', {}, {})
        .then((data: any) => {
          if (data.status == 200) {
            const { url } = data;
            const { headers } = data;
            const { serverUrl } = user;
            if (url) {
              user.serverUrl = url.split('/dhis-web-')[0];
            } else if (headers) {
              if (headers['set-cookie']) {
                headers['set-cookie']
                  .replace(/\s/g, '')
                  .split(';')
                  .map(cookieValue => {
                    if (cookieValue.indexOf('Path=/') > -1) {
                      const path = cookieValue.split('Path=/').pop();
                      const lastUrlPart = serverUrl.split('/').pop();
                      if (lastUrlPart !== path) {
                        if (lastUrlPart == '') {
                          user.serverUrl = serverUrl + path;
                        } else {
                          user.serverUrl = serverUrl + '/' + path;
                        }
                      }
                    }
                  });
              } else if (headers['Set-cookie']) {
                headers['set-cookie']
                  .replace(/\s/g, '')
                  .split(';')
                  .map(cookieValue => {
                    if (cookieValue.indexOf('Path=/') > -1) {
                      const path = cookieValue.split('Path=/').pop();
                      const lastUrlPart = serverUrl.split('/').pop();
                      if (lastUrlPart !== path) {
                        if (lastUrlPart == '') {
                          user.serverUrl = serverUrl + path;
                        } else {
                          user.serverUrl = serverUrl + '/' + path;
                        }
                      }
                    }
                  });
              }
            }
            this.getUserDataFromServer(user).subscribe(
              (data: any) => {
                const url = user.serverUrl.split('/dhis-web-')[0];
                user.serverUrl = url;
                observer.next({ data: data.data, user: data.user });
                observer.complete();
              },
              error => {
                const serverUrl = user.serverUrl;
                const dhisInstanceName = serverUrl.split('/').pop();
                //for other possible instances such as dev, demo
                if (dhisInstanceName != 'dhis') {
                  user.serverUrl = serverUrl + '/dhis';
                  this.authenticateUser(user).subscribe(
                    (data: any) => {
                      const url = user.serverUrl.split('/dhis-web-')[0];
                      user.serverUrl = url;
                      observer.next({ data: data, user: user });
                      observer.complete();
                    },
                    error => {
                      observer.error(error);
                    }
                  );
                } else {
                  observer.error(error);
                }
              }
            );
          } else {
            observer.error(data);
          }
        })
        .catch(error => {
          if (error.status == 301 || error.status == 302) {
            if (error.headers && error.headers.Location) {
              user.serverUrl = error.headers.Location;
              this.authenticateUser(user).subscribe(
                (data: any) => {
                  const url = user.serverUrl.split('/dhis-web-')[0];
                  user.serverUrl = url;
                  observer.next({ data: data, user: user });
                  observer.complete();
                },
                error => {
                  observer.error(error);
                }
              );
            } else if (error.headers && error.headers.location) {
              user.serverUrl = error.headers.location;
              this.authenticateUser(user).subscribe(
                (data: any) => {
                  const url = user.serverUrl.split('/dhis-web-')[0];
                  user.serverUrl = url;
                  observer.next({ data: data, user: user });
                  observer.complete();
                },
                error => {
                  observer.error(error);
                }
              );
            } else {
              observer.error(error);
            }
          } else {
            observer.error(error);
          }
        });
    });
  }

  offlineUserAuthentication(user: CurrentUser): Observable<any> {
    return new Observable(observer => {
      if (user && user.hashedKeyForOfflineAuthentication) {
        const hashedKeyForOfflineAuthentication = this.encryptionProvider.getHashedKeyForOfflineAuthentication(
          user
        );
        if (
          hashedKeyForOfflineAuthentication ==
          user.hashedKeyForOfflineAuthentication
        ) {
          observer.next(user);
          observer.complete();
        } else {
          observer.error({
            error: 'You have enter wrong username or password or server address'
          });
        }
      } else {
        observer.error({
          error:
            'You can not login offline, please make sure you have network and try in again'
        });
      }
    });
  }

  /**
   *
   * @param user
   * @returns {Observable<any>}
   */
  setCurrentUser(user: any): Observable<any> {
    user = JSON.stringify(user);
    return new Observable(observer => {
      this.storage.set('user', user).then(
        () => {
          observer.next();
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  /**
   *
   * @param systemInformation
   * @returns {Observable<any>}
   */
  setCurrentUserSystemInformation(systemInformation: any): Observable<any> {
    let dhisVersion = '22';
    if (systemInformation.version) {
      let versionArray = systemInformation.version.split('.');
      dhisVersion = versionArray.length > 0 ? versionArray[1] : dhisVersion;
    }
    dhisVersion = dhisVersion.split('-')[0];
    return new Observable(observer => {
      systemInformation = JSON.stringify(systemInformation);
      this.storage.set('systemInformation', systemInformation).then(
        () => {
          observer.next(dhisVersion);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  /**
   *
   * @param userDataResponse
   * @returns {Promise<T>}
   */
  setUserData(userDataResponse): Observable<any> {
    const userData = {
      Name: userDataResponse.name,
      Employer: userDataResponse.employer,
      'Job Title': userDataResponse.jobTitle,
      Education: userDataResponse.education,
      Gender: userDataResponse.gender,
      Birthday: userDataResponse.birthday,
      Nationality: userDataResponse.nationality,
      Interests: userDataResponse.interests,
      userRoles: userDataResponse.userCredentials.userRoles,
      organisationUnits: userDataResponse.organisationUnits,
      dataViewOrganisationUnits: userDataResponse.dataViewOrganisationUnits,
      dataSets: this.getAssignedDataSetIds(userDataResponse),
      programs: this.getAssignedProgramsId(userDataResponse)
    };
    return new Observable(observer => {
      this.storage.set('userData', JSON.stringify(userData)).then(
        () => {
          observer.next(userData);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  getAssignedDataSetIds(userData) {
    let dataSetsIds = [];
    if (userData && userData.dataSets) {
      dataSetsIds = userData.dataSets;
    } else if (
      userData &&
      userData.userCredentials &&
      userData.userCredentials.userRoles
    ) {
      userData.userCredentials.userRoles.map((userRole: any) => {
        if (userRole.dataSets) {
          userRole.dataSets.map((dataset: any) => {
            if (dataSetsIds.indexOf(dataset.id) == -1) {
              dataSetsIds.push(dataset.id);
            }
          });
        }
      });
    }
    return dataSetsIds;
  }

  getAssignedProgramsId(userData) {
    let programIds = [];
    if (userData && userData.programs) {
      programIds = userData.programs;
    } else if (
      userData &&
      userData.userCredentials &&
      userData.userCredentials.userRoles
    ) {
      userData.userCredentials.userRoles.map((userRole: any) => {
        if (userRole.programs) {
          userRole.programs.map((program: any) => {
            if (programIds.indexOf(program.id) == -1) {
              programIds.push(program.id);
            }
          });
        }
      });
    }
    return programIds;
  }

  /**
   *
   * @returns {Observable<any>}
   */
  getUserData(): Observable<any> {
    return new Observable(observer => {
      this.storage
        .get('userData')
        .then(
          userData => {
            userData = JSON.parse(userData);
            observer.next(userData);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        )
        .catch(error => {
          observer.error(error);
        });
    });
  }

  /**
   *
   * @returns {Observable<any>}
   */
  getCurrentUserSystemInformation(): Observable<any> {
    return new Observable(observer => {
      this.storage
        .get('systemInformation')
        .then(
          systemInformation => {
            systemInformation = JSON.parse(systemInformation);
            observer.next(systemInformation);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        )
        .catch(error => {
          observer.error(error);
        });
    });
  }

  /**
   *
   * @returns {Observable<any>}
   */
  getCurrentUser(): Observable<any> {
    return new Observable(observer => {
      this.storage.get('user').then(
        user => {
          user = JSON.parse(user);
          observer.next(user);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }
}
