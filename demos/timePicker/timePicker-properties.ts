import { TimePicker } from '../resources/component';
import { simple, complex } from '../component-properties/properties-util';

export function getTimeMethods(time: TimePicker): { [Key: string]: string | object }[] {
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

export function getTimeProps(time: TimePicker): (simple | complex)[] {
    let props: (simple | complex)[] = [];
    props.push({ prop: 'enablePersistence', type: 'bool' });
    props.push({ prop: 'enableRtl', type: 'bool' });
    props.push({ prop: 'enabled', type: 'bool' });
    props.push({ prop: 'readonly', type: 'bool' });
    props.push({ prop: 'showClearButton ', type: 'bool' });
    props.push({ prop: 'strictMode ', type: 'bool' });
    props.push({ prop: 'cssClass', type: 'text' });
    props.push({ prop: 'floatLabelType', type: 'text' });
    props.push({ prop: 'format', type: 'text' });
    props.push({ prop: 'locale', type: 'text' });
    props.push({ prop: 'max', type: 'text' });
    props.push({ prop: 'min', type: 'text' });   
    props.push({ prop: 'placeholder', type: 'text' });
    props.push({ prop: 'scrollTo', type: 'text' });
    props.push({ prop: 'step', type: 'text' });
    props.push({ prop: 'value', type: 'text' });
    props.push({ prop: 'width', type: 'text' });
    props.push({ prop: 'zIndex', type: 'text' });
    return props;
}