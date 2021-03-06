import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode';
import { UserProvider } from '../../providers/user/user';

import { AppsPage } from '../apps/apps';
import { AccountPage } from '../account/account';
import { SynchronizationProvider } from '../../providers/synchronization/synchronization';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = AppsPage;
  tab2Root = AccountPage;
  accountName: string = 'account';

  constructor(
    private user: UserProvider,
    private backgroundMode: BackgroundMode,
    private synchronizationProvider: SynchronizationProvider
  ) {}

  ngOnInit() {
    this.backgroundMode
      .disable()
      .then(
        () => {},
        reason => console.log('here : ' + JSON.stringify(reason))
      );
    this.user.getUserData().subscribe(userData => {
      this.setUserAccountName(userData);
    });
    this.user.getCurrentUser().subscribe(currentUser => {
      this.synchronizationProvider.startSynchronization(currentUser);
    });
  }

  setUserAccountName(userData) {
    let newValue = '';
    if (userData && userData.Name) {
      let nameList = userData.Name.split(' ');
      nameList.forEach(name => {
        newValue += name.charAt(0).toUpperCase();
      });
      this.accountName = newValue;
    }
  }
}
