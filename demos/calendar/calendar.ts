import { Property } from '../component-properties/main';
import { getCalendarMethods, getCalendarProps } from './calendar-properties'
import { Calendar } from '@syncfusion/ej2-calendars'

let calendar: Calendar = new Calendar();
calendar.appendTo("#calendar");
let PropSection: HTMLElement = document.querySelector('.prop') as HTMLElement;
let PropTable: Property = new Property(calendar, getCalendarProps(calendar), getCalendarMethods(calendar));
PropTable.appendTo(PropSection);