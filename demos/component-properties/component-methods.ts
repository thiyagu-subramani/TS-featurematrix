import { createElement, closest } from "@syncfusion/ej2-base";
import { singleProp, rowOptions, DDLOptions, CheckBoxOptions, InputOptions, Button } from "./properties-util";
import { Options } from "selenium-webdriver/firefox";
import { Calendar } from '@syncfusion/ej2-calendars'

export class CalendarsMethods {
    private methods: { [Key: string]: string | object }[];
    private calendar: Calendar;
    private element: HTMLElement;

    constructor(calendar: Calendar, method: { [Key: string]: string | object }[]) {
        this.calendar = calendar;
        this.methods = method;
    }

    public render(): HTMLElement {
        this.element = createElement('div', { innerHTML: '<div class=highlight>Methods:</div>' });
        for (let m of this.methods) {
            this.renderMethodElements(m);
        }
        return this.element;
    }

    private renderMethodElements(method: { [Key: string]: object | string }): void {
        let methodwrap;
        for (let key in method) {
            if (key === 'name') {
                methodwrap = this.getElement(key as string, 'method');
                methodwrap.appendChild(
                    createElement('strong', { innerHTML: method[key] as string })
                );
            }
            else {
                methodwrap.appendChild(this.renderSimpleProp(key, method[key]['type'], method[key]['data']));
            }
        }
        let submit = Button('Apply', (e: Event) => {
            this.submitAction(e);
        });
        methodwrap.appendChild(submit);
        this.element.appendChild(methodwrap);
    }

    private submitAction(e: Event) {
        let wrap: HTMLElement = closest(e.srcElement, '[data-prop=name]') as HTMLElement;
        let methodName: string = wrap.querySelector('strong').innerHTML;
        let child: Array<HTMLElement> = [].slice.call(wrap.childNodes);
        child = child.filter(m => m.hasAttribute('data-prop'));
        let returnData: Object = null;
        if (child.length > 0) {
            returnData = this.calendar[methodName](...this.getParams(child,methodName));
        } else {
            returnData = this.calendar[methodName].apply(this.calendar);
            if(returnData != undefined || returnData != null)
            alert(JSON.stringify(returnData));
        }
        // if (methodName.indexOf('get') === 0) {
        //     alert(JSON.stringify(returnData));
        // }
    }
    private getParams(child: Array<HTMLElement>,methodName :string): Array<object | boolean | string | number> {
        let params: Array<object | boolean | string | number> = [];
        for (let c of child) {
            let type: string = c.getAttribute('data-type');
            switch (type) {
                case 'checkbox':
                    let check: HTMLInputElement = c.querySelector('input[type=checkbox]') as HTMLInputElement;
                    params.push(check.checked)
                    break;
                case 'select':
                    params.push(c.querySelector('select').value);
                    break;
                case 'text':
                    let val: string | number | any = c.querySelector('input').value;
                    if (methodName === 'selectCell') {
                        val = { rowIndex: parseInt(val.split(',')[0]), cellIndex: parseInt(val.split(',')[1]) }
                    } else {
                        if (!isNaN(parseInt(val))) {
                            val = parseInt(val, 10);
                        } else {
                            val = val === '' ? null : val;
                        }
                    }

                    params.push(val);
                    break;
            }
        }
        return params;
    }

    private renderSimpleProp(key: string, type: string, data: Array<string>) {
        let wrap: HTMLElement;
        let options: rowOptions;
        let comp: any;
        switch (type) {

            case 'select':
                wrap = this.getElement(key as string, 'select');
                comp = {
                    data: data,
                    type: 'ddl'
                };
                options = { component: [comp as DDLOptions], label: key as string };
                break;

            case 'bool':
                wrap = this.getElement(key as string, 'checkbox');
                comp = {
                    type: 'checkbox'
                };
                options = { component: [comp as CheckBoxOptions], label: key as string };
                break;

            case 'text':
                wrap = this.getElement(key as string, 'text');
                comp = {
                    type: 'input'
                };
                options = { component: [comp as InputOptions], label: key as string };
                break;
        }
        singleProp(options, wrap);
        return wrap;
    }
    private getElement(propName: string, type: string, innerHtml?: Element): HTMLElement {
        return createElement('div', {
            attrs: {
                'data-prop': propName,
                'data-type': type
            }, innerHTML: innerHtml ? innerHtml.outerHTML : ''
        });
    }
}