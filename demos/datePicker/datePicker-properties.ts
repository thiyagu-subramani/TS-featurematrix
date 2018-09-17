import { DatePicker } from '../resources/component';
import { simple, complex } from '../component-properties/properties-util';

export function getDateMethods(date: DatePicker): { [Key: string]: string | object }[] {
    let methods: { [Key: string]: string | object }[] = [];
    methods.push({
        name: 'show'
    });
    methods.push({
        name: 'hide'
    });
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
    methods.push({
        name: 'focusIn'
    });
    methods.push({
        name: 'focusOut'
    });
    methods.push({
        name: 'blur'
    });
    return methods;
}

export function getDateProps(date: DatePicker): (simple | complex)[] {
    let props: (simple | complex)[] = [];
    props.push({ prop: 'enablePersistence', type: 'bool' });
    props.push({ prop: 'enableRtl', type: 'bool' });
    props.push({ prop: 'enabled', type: 'bool' });
    props.push({ prop: 'readonly', type: 'bool' });
    props.push({ prop: 'showClearButton', type: 'bool' });
    props.push({ prop: 'showTodayButton', type: 'bool' });
    props.push({ prop: 'strictMode', type: 'bool' });
    props.push({ prop: 'weekNumber', type: 'bool' });
    props.push({ prop: 'cssClass', type: 'text' });
    props.push({ prop: 'depth', data: ['Month', 'Year', 'Decade'], type: 'select' });
    props.push({ prop: 'firstDayOfWeek', type: 'text' });
    props.push({ prop: 'floatLabelType', data: ['Never', 'Auto', 'Always'], type: 'select' });
    props.push({ prop: 'format', data: ['Default', 'dd-MMM-yy', 'yyyy-MM-dd', 'dd-MMMM'], type: 'select' });
    props.push({ prop: 'locale', data: ['en-US', 'de-DE', 'ar'], type: 'select' });
    props.push({ prop: 'max', type: 'text' });
    props.push({ prop: 'min', type: 'text' });   
    props.push({ prop: 'placeholder', type: 'text' });  
    props.push({ prop: 'start', data: ['Month', 'Year', 'Decade'], type: 'select' });
    props.push({ prop: 'value', type: 'text' });
    props.push({ prop: 'width', type: 'text' });
    props.push({ prop: 'zIndex', type: 'text' });
    return props;
}