import { Property } from '../component-properties/main';
import { getTimeMethods, getTimeProps } from './timePicker-properties'
import { TimePicker } from '../resources/component';

let time: TimePicker = new TimePicker({width: 300, placeholder: "Select a time"});
time.appendTo("#time");
let PropSection: HTMLElement = document.querySelector('.prop') as HTMLElement;
let PropTable: Property = new Property(time, getTimeProps(time), getTimeMethods(time));
PropTable.appendTo(PropSection);