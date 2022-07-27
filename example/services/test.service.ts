import { Injectable } from '@melodic/injection';

@Injectable({
	token: 'TestService'
})
export class TestService {
	consoleAge(age: number): void {
		console.log(age);
	}
}
