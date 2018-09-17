import { Sidebar } from '../resources/component-sidebar';
import { simple, complex } from '../component-properties/properties-util';

export function getSidebarMethods(sidebar: Sidebar): { [Key: string]: string | object }[] {
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
        name: 'toggle'
    });
    return methods;
}

export function getSidebarProps(sidebar: Sidebar): (simple | complex)[] {
    let props: (simple | complex)[] = [];
    props.push({ prop: 'enableRtl', type: 'bool' });
    props.push({ prop: 'enablePersistence', type: 'bool' });
    props.push({ prop: 'animate', type: 'bool' });
    props.push({ prop: 'closeOnDocumentClick', type: 'bool' });
    props.push({ prop: 'enableDock', type: 'bool' });
    props.push({ prop: 'enableGestures', type: 'bool' });
    props.push({ prop: 'isOpen', type: 'bool' });
    props.push({ prop: 'showBackdrop', type: 'bool' });
    props.push({ prop: 'dockSize', type: 'text' });
    props.push({ prop: 'mediaQuery', type: 'text' });  
    props.push({ prop: 'position', type: 'text' });
    props.push({ prop: 'target', type: 'text' });
    props.push({ prop: 'type ', type: 'text' });  
    props.push({ prop: 'width', type: 'text' });
    props.push({ prop: 'zIndex', type: 'text' });
    return props;
}