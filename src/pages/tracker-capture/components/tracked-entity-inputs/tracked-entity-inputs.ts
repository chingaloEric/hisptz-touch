import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingsProvider } from '../../../../providers/settings/settings';
import { ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the TrackedEntityInputsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tracked-entity-inputs',
  templateUrl: 'tracked-entity-inputs.html'
})
export class TrackedEntityInputsComponent implements OnInit {
  @Input() trackedEntityAttribute;
  @Input() currentUser;
  @Input() mandatory;
  @Input() data;
  @Input() trackedEntityAttributesSavingStatusClass;
  @Output() onChange = new EventEmitter();

  fieldLabelKey: any;
  textInputField: Array<string>;
  numericalInputField: Array<string>;
  supportValueTypes: Array<string>;
  formLayout: string;
  dataEntrySettings: any;
  barcodeSettings: any;
  isLoading: boolean;

  constructor(
    private settingProvider: SettingsProvider,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.numericalInputField = [
      'INTEGER_NEGATIVE',
      'INTEGER_POSITIVE',
      'INTEGER',
      'NUMBER',
      'INTEGER_ZERO_OR_POSITIVE'
    ];
    this.textInputField = ['TEXT', 'LONG_TEXT'];
    this.supportValueTypes = [
      'BOOLEAN',
      'TRUE_ONLY',
      'DATE',
      'DATETIME',
      'TIME',
      'TEXT',
      'LONG_TEXT',
      'INTEGER_NEGATIVE',
      'INTEGER_POSITIVE',
      'INTEGER',
      'NUMBER',
      'INTEGER_ZERO_OR_POSITIVE',
      'COORDINATE',
      'ORGANISATION_UNIT',
      'UNIT_INTERVAL',
      'PERCENTAGE',
      'EMAIL',
      'PHONE_NUMBER',
      'AGE'
    ];
    if (this.trackedEntityAttribute && this.trackedEntityAttribute.id) {
      this.fieldLabelKey = this.trackedEntityAttribute.name;
      this.formLayout = 'listLayout';
      this.settingProvider
        .getSettingsForTheApp(this.currentUser)
        .subscribe((appSettings: any) => {
          const dataEntrySettings = appSettings.entryForm;
          this.barcodeSettings = appSettings.barcode;
          this.dataEntrySettings = dataEntrySettings;
          if (dataEntrySettings.formLayout) {
            this.formLayout = dataEntrySettings.formLayout;
          }
          if (
            dataEntrySettings.label &&
            this.trackedEntityAttribute[dataEntrySettings.label] &&
            isNaN(this.trackedEntityAttribute[dataEntrySettings.label])
          ) {
            this.fieldLabelKey = this.trackedEntityAttribute[
              dataEntrySettings.label
            ];
          }
          this.isLoading = false;
        });
    }
  }

  showTooltips() {
    let title = this.fieldLabelKey;
    let subTitle = '';
    if (this.trackedEntityAttribute.description) {
      title += '. Description : ' + this.trackedEntityAttribute.description;
    }
    subTitle +=
      'Value Type : ' +
      this.trackedEntityAttribute.valueType
        .toLocaleLowerCase()
        .replace(/_/g, ' ');
    if (this.trackedEntityAttribute.optionSet) {
      title +=
        '. It has ' +
        this.trackedEntityAttribute.optionSet.options.length +
        ' options to select.';
    }
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      subTitle: subTitle
    });
    actionSheet.present();
  }

  updateValue(updatedValue) {
    this.trackedEntityAttributesSavingStatusClass[updatedValue.id] =
      'input-field-container-saving';
    this.onChange.emit(updatedValue);
  }
}
