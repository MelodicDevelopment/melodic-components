import { template } from './my-first.template';
import { styles } from './my-first.styles';
import { Component } from '../../../src/component/component.class';

@Component.register({
	selector: 'my-first',
	styles: styles,
	template: template
})
export class MyFirstComponent {
	age: number = 43;
	message: string = this.getMessage();

	getAge(): number {
		return this.age;
	}

	onCreate(): void {
		console.log('Created My First');
	}

	getMessage(): string {
		return `Rick Hopkins: ${this.getAge()}`;
	}

	testMethod(): void {
		this.age++;
		this.message = `Rick Hopkins: ${this.age}`;
	}
}
