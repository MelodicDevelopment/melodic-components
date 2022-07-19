import { Component } from '@melodic/component';
import { Inject, Injector } from '@melodic/injection';
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

	private _testService: TestService;

	//constructor(testService: TestService = Injector.get('TestService')) {
	constructor(@Inject('TestService') testService: TestService) {
		this._testService = testService;
		console.log(this._testService.prop1);
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
	}
}
