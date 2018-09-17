import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Internationalization } from '@syncfusion/ej2-base';

let intl: Internationalization = new Internationalization();

let dropdownInstance: DropDownList = new DropDownList({
    placeholder: "Select a date format",
    change: onChange
});
dropdownInstance.appendTo('#dateformats');

function onChange(): void {
    let value: string = <string>dropdownInstance.value;
    let formattedString: string = intl.formatDate(new Date('1/12/2014 10:20:33'), { skeleton: value });
    (<HTMLInputElement>document.getElementById('date')).value  =  formattedString;
}
