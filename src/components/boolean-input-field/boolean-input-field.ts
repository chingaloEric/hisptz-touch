import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Generated class for the BooleanInputFieldComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'boolean-input-field',
  templateUrl: 'boolean-input-field.html'
})
export class BooleanInputFieldComponent implements OnInit {
  @Input() dataElementId;
  @Input() categoryOptionComboId;
  @Input() data;
  @Output() onChange = new EventEmitter();
  inputFieldValue: any;
  fieldId: string;
  options: Array<{ name: string; code: any }>;
  //{"id":"s46m5MS0hxu-Prlt0C1RF0s","value":"1","status":"synced"}
  //id = dataElementId + "-" + categoryOptionComboId
  constructor() {
    this.options = [
      {
        name: 'Yes',
        code: true
      },
      {
        name: 'No',
        code: false
      }
    ];
  }

  ngOnInit() {
    const fieldId = this.dataElementId + '-' + this.categoryOptionComboId;
    this.fieldId = fieldId;
    if (this.data && this.data[fieldId]) {
      this.inputFieldValue = '' + this.data[fieldId].value;
    } else {
      this.inputFieldValue = '';
    }
  }

  onUpdateValue(value) {
    this.inputFieldValue = value;
    const dataValue = value == 'false' ? false : value == 'true' ? true : '';
    this.updateValues(dataValue);
  }

  updateValues(dataValue) {
    const fieldId = this.dataElementId + '-' + this.categoryOptionComboId;
    this.onChange.emit({
      id: fieldId,
      value: dataValue,
      status: 'not-synced'
    });
  }
}
