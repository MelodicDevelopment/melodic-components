import { Component } from '@melodic/component';
import { template } from './my-second.template';
import { styles } from './my-second.styles';

@Component({
	selector: 'my-second',
	styles: styles,
	template: template
})
export class MySecondComponent {
	myAge: number = 12;
}
