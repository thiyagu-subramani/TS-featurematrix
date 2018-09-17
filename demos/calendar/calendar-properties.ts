import { Calendar } from '@syncfusion/ej2-calendars';
import { simple, complex } from '../component-properties/properties-util';

export function getCalendarMethods(calendar: Calendar): { [Key: string]: string | object }[] {
    let methods: { [Key: string]: string | object }[] = [];
    methods.push({
        name: 'destroy'
    });
    methods.push({
        name: 'getPersistData'
    });
    methods.push({
        name: 'navigateTo'
    });
    methods.push({
        name: 'currentView'
    });
    return methods;
}

export function getCalendarProps(calendar: Calendar): (simple | complex)[] {
    let props: (simple | complex)[] = [];
    props.push({ prop: 'enablePersistence', type: 'bool' });
    props.push({ prop: 'enableRtl', type: 'bool' });
    props.push({ prop: 'showTodayButton', type: 'bool' });
    props.push({ prop: 'weekNumber', type: 'bool' });
    props.push({ prop: 'depth', type: 'text' });
    props.push({ prop: 'firstDayOfWeek', type: 'text' });
    props.push({ prop: 'locale', type: 'text' });
    props.push({ prop: 'max', type: 'text' });
    props.push({ prop: 'min', type: 'text' });
    props.push({ prop: 'start', type: 'text' });
    props.push({ prop: 'value', type: 'text' });
    return props;
}