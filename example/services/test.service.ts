import { Injectable } from '@melodic/injection';

@Injectable({
	token: 'TestService'
})
export class TestService {
	prop1: number = 43;
}
