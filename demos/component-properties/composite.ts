import { createElement, closest } from "@syncfusion/ej2-base";
import { Button, DDL, MultiSelect, checkbox, generateWidget, CheckBoxOptions, singleProp, rowOptions, DDLOptions, InputOptions } from "./properties-util";
import {valType} from './properties-util'
import { Calendar } from '@syncfusion/ej2-calendars'
export class composite {
    private prop: object;
    private element: HTMLElement;
    private submit: HTMLElement;
    private parent: HTMLElement;
    private calendar: Calendar;

    constructor(prop: object, calendar: Calendar) {
        this.prop = prop;
        this.calendar = calendar;
    }

    private isComplex(prop: object): boolean {
        return prop && typeof prop === 'object' && ( prop['length'] === undefined && prop['data'] === undefined); 
    }

    private isLeafNode(data: object): boolean {
        return data && (typeof data === 'string' || data['data'] !== undefined) ? true : false;
    }

    private isArray(prop: object): boolean {
        return prop && (typeof prop === 'object' && (prop['type'] === 'select' &&
            prop['data'] !== undefined));
    }

    private isMultiArray(prop: object): boolean {
        return prop && (typeof prop === 'object' && (
            prop['data'] !== undefined && prop['type']=== 'array'));
    }

    private isArrayOfObject(prop: object): boolean {
        return this.isArray(prop) && this.isComplex(prop[0]);
    }

    public render(): HTMLElement {
        let prop = this.prop['prop'];
        if(this.isComplex(prop)){
            this.element = this.getComplexElement(this.getPropName(prop));   
            this.element.classList.add('complex');
            for (let key in prop) {
                if (this.isComplex(prop[key])) {
                    let complexEle = this.getComplexElement(key);                    
                    complexEle.appendChild(createElement('strong', {innerHTML: key + ':'}));
                    this.element.appendChild(complexEle); 
                    this.renderSubProp(prop[key],complexEle);              
                } else {
                    let checkbox: CheckBoxOptions = {type: 'checkbox', default: false, change: null}
                    this.element.appendChild(generateWidget(checkbox));
                }
            }
            this.submit = Button('Apply', (e: Event) => {
                this.submitAction(e);
            });
            this.element.appendChild(this.submit);
        }            
        return this.element;
    }

    private submitAction(e: Event) {
        let wrap: HTMLElement = closest(e.srcElement, '[data-prop=prop]') as HTMLElement;
        this.parent = wrap.querySelector('[data-prop]') as HTMLElement;
        let prop = {};
        let parentType = this.parent.getAttribute('data-prop');
        prop[parentType]= {};
        let child: Array<HTMLElement> = [].slice.call(this.parent.childNodes);
        child = child.filter(m=>m.hasAttribute('data-prop'));
        this.ensureChildNodes(child, prop[parentType]);
        this.calendar[parentType] = prop[parentType];
        // this.calendar.dataBind();
    }

    private ensureChildNodes(child: Array<HTMLElement>, parentObj:  {[Key: string]:valType}): void{
        for (let c of child){
            let sub = c.getAttribute('data-prop');
            let type = c.getAttribute('data-type');
            this.frameJSON(sub, type, c as HTMLElement, parentObj);
            let innerchild: Array<HTMLElement> = [].slice.call(c.childNodes);
            innerchild = innerchild.filter(m=>m.hasAttribute('data-prop'));
            if(innerchild.length > 0){
                this.ensureChildNodes(innerchild, parentObj[sub] as {[Key: string]:valType});
            }
        }
    }

    private frameJSON(propName: string, type: string, element: HTMLElement, obj: { [Key: string]: valType }): { [Key: string]: valType } {
        switch (type) {
            case 'multi':
                let options = [].slice.call((element.querySelector('ul') as HTMLUListElement).querySelectorAll('input[type=checkbox]'));
                if (options.length) {
                    let temp = [];
                    for (let opt of options) {
                        if (opt.checked) {
                            temp.push(opt.value);
                        }
                    }
                    obj[propName] = temp;
                }
                break;
            case 'checkbox':
                let check: HTMLInputElement = element.querySelector('input[type=checkbox]') as HTMLInputElement;
                obj[propName] = check.checked;
                break;
            case 'array':
                obj[propName] =  element.querySelector('select').value
                break;
            case 'text':               
            let val =  element.querySelector('input').value;
            obj[propName] =  obj[propName] = isNaN(parseInt(val)) ? val : parseInt(val);
                break;
            case 'object':
                obj[propName] = {};
                break;
        }
        return obj;
    }

    private renderSubProp(sub: object | string, element: HTMLElement): void {
        sub = sub as object;
        if (this.isComplex(sub) && !this.isLeafNode(sub)) {
            for (let key in sub) {
                if(!this.isLeafNode(sub[key])){
                    let comp: HTMLElement = this.getComplexElement(key);
                    element.appendChild(comp);
                    this.renderSubProp(sub[key], comp);
                } else if(typeof sub[key] === 'string') {
                    this.renderSimpleProp(sub[key], key, element);
                } else if (this.isLeafNode(sub[key])){
                    this.renderSimpleProp(sub[key], key, element);
                }
            }
        }
        else {
            this.renderSimpleProp(sub, sub, element);
        }
    }

    private renderSimpleProp(sub: object | string, key: string | object, element: HTMLElement) {
        sub = sub as object;
        let wrap: HTMLElement;
        let options: rowOptions;
        let val =  this.calendar[element.getAttribute('data-prop')][key as string];
        if (this.isArrayOfObject(sub)) {

        } else if (this.isMultiArray(sub)) {
            wrap = this.getElement(key as string, 'multi');
            let comp = {
                data: sub['data'],
                type: 'checkboxMSList',
                default: val ? val : []
            };
            options = { component: [comp as DDLOptions], label: key as string };            
        } else if (this.isArray(sub)) {
            wrap = this.getElement(key as string, 'array');
            let comp = {
                data: sub['data'],
                type: 'ddl',
                default: val ? val: ''
            };
            options = { component: [comp as DDLOptions], label: key as string }; 
        } else if (typeof sub === 'string' && sub === 'bool') {
            wrap = this.getElement(key as string, 'checkbox');
            let comp = {
                type: 'checkbox',
                default: val !== null ? val : false
            };
            options = { component: [comp as CheckBoxOptions], label: key as string }; 
        } else if (typeof sub === 'string' && sub === 'text') {
            let val =  this.calendar[element.getAttribute('data-prop')][key as string];
            wrap = this.getElement(key as string, 'text');
            let comp = {
                type: 'input',
                default:  val ? val : ''
            };
            options = { component: [comp as InputOptions], label: key as string }; 
        }
        singleProp(options, wrap);
        element.appendChild(wrap);
    }

    private getPropName(prop: object): string {
        let temp = { prop };
        return Object.keys(temp)[0];
    }

    private getComplexElement(propName: string): HTMLElement {
        return createElement('div', { attrs: { 'data-prop': propName, 'data-type': 'object' } });
    }

    private getElement(propName: string, type: string, innerHtml?: Element): HTMLElement {
        return createElement('div', {
            attrs: {
                'data-prop': propName,
                'data-type': type
            }, innerHTML: innerHtml ? innerHtml.outerHTML : ''
        });
    }
    private getArrayObjectElement(propName: string[], type: string, innerHtml: Element): HTMLElement {
        let ele = createElement('div', {
            attrs: {
                'data-type': type
            }, innerHTML: innerHtml.outerHTML
        });
        let i: number = 1;
        for (let prop of propName) {
            ele.setAttribute('data-prop' + i, prop);
        }
        return ele;
    }

}