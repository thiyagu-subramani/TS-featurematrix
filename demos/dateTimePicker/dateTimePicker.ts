import { Property } from '../component-properties/main';
import { getDateTimeMethods, getDateTimeProps } from './dateTimePicker-properties'
import { DateTimePicker } from '@syncfusion/ej2-calendars'

let dateTime: DateTimePicker  = new DateTimePicker({width: 248, placeholder: "Select a date and time"});
dateTime.appendTo("#dateTime");
let PropSection: HTMLElement = document.querySelector('.prop') as HTMLElement;
let PropTable: Property = new Property(dateTime, getDateTimeProps(dateTime), getDateTimeMethods(dateTime));
PropTable.appendTo(PropSection);