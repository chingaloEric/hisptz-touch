import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SyncProvider } from '../../providers/sync/sync';
import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';

/**
 * Generated class for the SyncPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sync',
  templateUrl: 'sync.html'
})
export class SyncPage implements OnInit {
  isSyncContentOpen: any;
  syncContents: Array<any>;
  public resources: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private syncProvider: SyncProvider,
    private sqLiteProvider: SqlLiteProvider
  ) {}

  ngOnInit() {
    this.isSyncContentOpen = {};
    this.syncContents = this.syncProvider.getSyncContentDetails();
    if (this.syncContents.length > 0) {
      this.toggleSyncContents(this.syncContents[0]);
    }
    this.resources = [];
    const dataBaseStructure = this.sqLiteProvider.getDataBaseStructure();
    Object.keys(dataBaseStructure).forEach((resource: any) => {
      if (dataBaseStructure[resource].isMetadata) {
        this.resources.push({
          name: resource,
          displayName: dataBaseStructure[resource].displayName
            ? dataBaseStructure[resource].displayName
            : resource,
          status: false,
          dependentTable: dataBaseStructure[resource].dependentTable
        });
      }
    });
  }

  toggleSyncContents(content) {
    if (content && content.id) {
      if (this.isSyncContentOpen[content.id]) {
        this.isSyncContentOpen[content.id] = false;
      } else {
        Object.keys(this.isSyncContentOpen).map(id => {
          this.isSyncContentOpen[id] = false;
        });
        this.isSyncContentOpen[content.id] = true;
      }
    }
  }

  trackByFn(index, item) {
    return item && item.id ? item.id : index;
  }
}
