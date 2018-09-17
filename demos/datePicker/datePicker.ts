import { Property } from '../component-properties/main';
import { getDateMethods, getDateProps } from './datePicker-properties'
import { DatePicker } from '../resources/component';

let date: DatePicker  = new DatePicker({width: 248, placeholder: "Choose a date"});
date.appendTo("#date");
let PropSection: HTMLElement = document.querySelector('.prop') as HTMLElement;
let PropTable: Property = new Property(date, getDateProps(date), getDateMethods(date));
PropTable.appendTo(PropSection);