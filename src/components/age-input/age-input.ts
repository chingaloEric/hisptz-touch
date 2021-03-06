import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the AgeInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

export interface CurrentAge {
  years: number;
  months: number;
  days: number;
}

@Component({
  selector: 'age-input',
  templateUrl: 'age-input.html'
})
export class AgeInputComponent implements OnInit {
  @Input() dataElementId;
  @Input() categoryOptionComboId;
  @Input() data;
  @Output() onChange = new EventEmitter();
  inputFieldValue: string;
  currentAge: CurrentAge;
  momentFormat: string;

  constructor() {
    this.momentFormat = 'YYYY-MM-DD';
    this.currentAge = {
      days: 0,
      months: 0,
      years: 0
    };
  }

  ngOnInit() {
    const fieldId = this.dataElementId + '-' + this.categoryOptionComboId;
    if (this.data && this.data[fieldId]) {
      this.inputFieldValue = '' + this.data[fieldId].value;
    } else {
      this.inputFieldValue = '';
    }
    this.setCurrentAgeValue();
  }

  setCurrentAgeValue() {
    const now = moment();
    const dob =
      this.inputFieldValue && this.inputFieldValue != ''
        ? moment(this.inputFieldValue, this.momentFormat)
        : moment(moment().format(this.momentFormat), this.momentFormat);
    this.currentAge.years = now.diff(dob, 'years');
    dob.add(this.currentAge.years, 'years');
    this.currentAge.months = now.diff(dob, 'months');
    dob.add(this.currentAge.months, 'months');
    this.currentAge.days = now.diff(dob, 'days');
  }

  updateValue(data) {
    this.inputFieldValue = data;
    this.setCurrentAgeValue();
    this.updateChanges(data);
  }

  setCurrentDate() {
    const { days } = this.currentAge;
    const { months } = this.currentAge;
    const { years } = this.currentAge;
    this.inputFieldValue = moment()
      .subtract({ days: days, months: months, years: years })
      .format(this.momentFormat);
    this.updateChanges(this.inputFieldValue);
  }

  updateChanges(value) {
    const fieldId = this.dataElementId + '-' + this.categoryOptionComboId;
    this.onChange.emit({
      id: fieldId,
      value: value,
      status: 'not-synced'
    });
  }
}
