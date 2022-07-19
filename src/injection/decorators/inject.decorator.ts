import { Injector } from '../injection-engine.class';
import { IDependency } from '../interfaces';

export function Inject(token: string): (target: any, _: string, index: number) => any {
	return function <T>(target: IDependency<T>, _: string, index: number): any {
		const instance: T = Injector.get(token);

		if (!target.params) {
			target.params = [];
		}

		target.params[index] = instance;

		return instance;
	};
}
