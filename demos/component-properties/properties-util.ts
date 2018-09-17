import { createElement, getUniqueID, EventHandler } from '@syncfusion/ej2-base';

export function DDL(data: string[], changeAction?: Function, val?: string): HTMLSelectElement {
    let ddl: HTMLSelectElement = document.createElement('select');
    ddl.classList.add(classList.ddl);
    for (let item of data) {
        let option: HTMLOptionElement = document.createElement('option');
        option.innerHTML = item;
        if (val === item) {
            option.selected = true;
        }
        ddl.appendChild(option);
    }
    if (changeAction) {
        ddl.onchange = (e: any) => {
            changeAction(e);
        }
    }
    ddl.id = getUniqueID('grid_select');
    return ddl;
}
export function MultiSelect(data: string[], changeAction?: Function, val?: string[]): HTMLSelectElement {
    let ddl: HTMLSelectElement = document.createElement('select');
    ddl.setAttribute('multiple', 'true');
    ddl.classList.add(classList.ddl);
    for (let item of data) {
        let option: HTMLOptionElement = document.createElement('option');
        option.innerHTML = item;
        if (val) {
            for (let v of val) {
                if (v === item) {
                    option.selected = true;
                }
            }
        }

        ddl.appendChild(option);
        }
    if (changeAction) {
        ddl.onchange = (e: any) => {
            changeAction(e);
        }
    }
    ddl.id = getUniqueID('grid_mselect');
    return ddl;
}
export function Button(text: string, clickAction: Function): HTMLButtonElement {
    let button: HTMLButtonElement = document.createElement('button');
    button.className = classList.btn;
    button.innerHTML = text;
    if (clickAction) {
        button.onclick = (e: any) => {
            clickAction(e);
        };
    }
    button.id = getUniqueID('grid_btn');
    return button;
}

export function Input(val: string, change?: Function): HTMLInputElement {
    let inp: HTMLInputElement = document.createElement('input');
    inp.className = 'form-control';
    inp.type = 'text';
    inp.value = val ? val : '';
    if (change) {
        inp.onchange = (e: any) => {
            change(e);
        };
    }
    inp.id = getUniqueID('grid_input');
    return inp;
}
export function checkbox(val: boolean, change?: Function): HTMLInputElement {
    let inp: HTMLInputElement = document.createElement('input');
    inp.className = classList.btn;
    inp.type = 'checkbox';
    inp.checked = val;
    if (change) {
        inp.onchange = (e: any) => {
            change(e);
        };
    }
    inp.id = getUniqueID('grid_checkbox');
    return inp;
}


export function generateRow() {
    return createElement('div', { className: classList.row });
}

export function generateColumn(columns: Element[], appendTo: Element): HTMLElement {
    let dim = 12 / columns.length;
    for (let Ele of columns) {
        let column: HTMLElement = createElement('div', { className: classList['column' + dim] });
        column.appendChild(Ele);
        appendTo.appendChild(column);
    }
    return appendTo as HTMLElement;
}

export function generateProp(rows: rowOptions[]): HTMLElement {
    let wrap: HTMLElement = document.createElement('div');
    for (let row of rows) {
        wrap.appendChild(this.singleProp(row, generateRow()));
    }
    return wrap;
}

export function singleProp(row: rowOptions, wrap: HTMLElement) {
    let columns: Element[] = [];
    columns.push(createElement('strong', { innerHTML: row.label }));
    for (let comp of row.component) {
        columns.push(generateWidget(comp));
    }
    return generateColumn(columns, wrap);
}
export function generateWidget(component: ComponentType) {
    let widget: HTMLElement;
    switch (component.type) {
        case 'ddl':
            let ddl = (component as DDLOptions);
            widget = DDL(ddl.data, ddl.change, ddl.default as string);
            break;
        case 'button':
            let btn = (component as ButtonOptions);
            widget = Button(btn.text, btn.click);
            break;
        case 'input':
            let inp = (component as InputOptions);
            widget = Input(inp.default as string, inp.change);
            break;
        case 'checkbox':
            let check = (component as CheckBoxOptions);
            widget = checkbox(check.default as boolean, check.change);
            break;
        case 'multiSelect':
            let multi = (component as DDLOptions);
            widget = MultiSelect(multi.data as string[], multi.change, multi.default as string[]);
            break;
        case 'checkboxMSList':
            let msList = (component as DDLOptions);
            widget = CheckboxMultiSelect(msList.data as string[], msList.change, msList.default as string[], msList.attrs);
            break;
    }
    return widget;
}

export interface Options {
    default?: boolean | number | string | string[];
    type: Component;
}
export interface DDLOptions extends Options {
    data: string[];
    change?: Function;
    attrs?: {[key: string]: string};
}

export interface ButtonOptions extends Options {
    text: string;
    click?: Function;
}

export interface CheckBoxOptions extends Options {
    change?: Function;
}

export interface InputOptions extends Options {
    change?: Function;
}

export interface rowOptions {
    label: string;
    component: ComponentType[];
}

export type Component = 'ddl' | 'button' | 'checkbox' | 'input' | 'multiSelect' | 'checkboxMSList';
export type ComponentType = DDLOptions | ButtonOptions | InputOptions | CheckBoxOptions;
export type valType = string | number | boolean | string[] | { [Key: string]: object } | { [Key: string]: object }[];

let classList = {
    btn: 'btn btn-default',
    ddl: 'form-control',
    input: 'form-control',
    row: 'row',
    column6: 'col-md-6',
    column4: 'col-md-4'
}

export interface simple {
    prop: string;
    type?: string
    data?: string[];
}

export interface complex {
    prop: { [key: string]: object };
    isMulti?: boolean;
}
export function CheckboxMultiSelect(data: string[], changeAction?: Function, val?: string[], attr?: {[Key: string]: string}): HTMLUListElement {
    let ddl: HTMLUListElement = document.createElement('ul');    
    ddl.classList.add('multiselect');
    for (let key in attr){
        ddl.setAttribute(key, attr[key]);
    }
    for(let item of data){
        ddl.appendChild(generateLi(item, val));
    }    
    return ddl;
}

function generateLi(data:string, val?: string[], changeAction?: Function): HTMLElement {
    let id = getUniqueID('grid_mslict');
    let attrs: {};
    if( val && val.indexOf(data) > -1) {
        attrs = {type: 'checkbox', id: id, value: data, checked: true};
    } else {
        attrs = {type: 'checkbox', id: id, value: data};
    }
    let checkbox = createElement('input', {attrs:attrs});    
    let label = createElement('label', { attrs: {for: id}, innerHTML: checkbox.outerHTML + data});
    return createElement('li', {innerHTML: label.outerHTML});
}