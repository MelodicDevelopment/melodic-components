import { template } from './my-second.template';
import { styles } from './my-second.styles';
import { Component } from '../../../src/component/component.class';

@Component.register({
	selector: 'my-second',
	styles: styles,
	template: template
})
export class MySecondComponent {
	myAge: number = 12;
}
