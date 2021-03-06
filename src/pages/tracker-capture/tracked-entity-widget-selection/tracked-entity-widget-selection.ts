import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { AppTranslationProvider } from '../../../providers/app-translation/app-translation';

/**
 * Generated class for the TrackedEntityWidgetSelectionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracked-entity-widget-selection',
  templateUrl: 'tracked-entity-widget-selection.html'
})
export class TrackedEntityWidgetSelectionPage implements OnInit, OnDestroy {
  dashboardWidgets: any;
  currentWidget: any;
  icon: string;
  translationMapper: any;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private appTranslation: AppTranslationProvider
  ) {}

  ngOnInit() {
    this.icon = 'assets/icon/list-of-items.png';
    this.dashboardWidgets = this.navParams.get('dashboardWidgets');
    this.currentWidget = this.navParams.get('currentWidget');
    this.translationMapper = {};
    this.appTranslation.getTransalations(this.getValuesToTranslate()).subscribe(
      (data: any) => {
        this.translationMapper = data;
      },
      error => {}
    );
  }

  getFilteredList(ev: any) {
    let val = ev.target.value;
    this.dashboardWidgets = this.navParams.get('dashboardWidgets');
    if (val && val.trim() != '') {
      this.dashboardWidgets = this.dashboardWidgets.filter(
        (dashboardWidget: any) => {
          return (
            dashboardWidget.name.toLowerCase().indexOf(val.toLowerCase()) > -1
          );
        }
      );
    }
  }

  setSelectedWidget(currentWidget) {
    this.viewCtrl.dismiss(currentWidget);
  }

  dismiss() {
    this.viewCtrl.dismiss({});
  }

  ngOnDestroy() {
    this.currentWidget = null;
    this.dashboardWidgets = null;
  }

  trackByFn(index, item) {
    return item && item.id ? item.id : index;
  }

  getValuesToTranslate() {
    return ['There is no widget to select'];
  }
}
