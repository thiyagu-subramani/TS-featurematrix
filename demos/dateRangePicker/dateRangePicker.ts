import { Property } from '../component-properties/main';
import { getDateRangeMethods, getDateRangeProps } from './dateRangePicker-properties'
import { DateRangePicker } from '../resources/component';

let dateRange: DateRangePicker  = new DateRangePicker({width: 300, placeholder :'Select a Range'});
dateRange.appendTo("#dateRange");
let PropSection: HTMLElement = document.querySelector('.prop') as HTMLElement;
let PropTable: Property = new Property(dateRange, getDateRangeProps(dateRange), getDateRangeMethods(dateRange));
PropTable.appendTo(PropSection);