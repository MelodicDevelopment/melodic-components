import { Component } from '@melodic/component';
import { Inject } from '@melodic/injection';
import { TestService } from '../../services/test.service';
import { template } from './my-first.template';
import { styles } from './my-first.styles';

@Component({
	selector: 'my-first',
	styles: styles,
	template: template
})
export class MyFirstComponent {
	age: number = 43;
	message: string = this.getMessage();

	#testService: TestService;

	constructor(@Inject('TestService') testService: TestService) {
		this.#testService = testService;
	}

	getAge(): number {
		return this.age;
	}

	getMessage(): string {
		return `Rick Hopkins: ${this.getAge()}`;
	}

	testMethod(): void {
		this.age++;
		this.message = `Rick Hopkins: ${this.age}`;

		this.#testService.consoleAge(this.age);
	}
}
