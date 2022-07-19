import { Dependency } from './dependency.class';
import { IDependency } from './interfaces/idependency.interface';

export class InjectionEngine {
	dependencies: Dependency<unknown>[] = [];

	bind<T>(token: string, item: IDependency<T>): Dependency<T> {
		const dependency = new Dependency<T>(token, item);
		this.dependencies.push(dependency);
		return dependency;
	}

	get<T>(token: string): T {
		const dependencyRef = this.getDependency(token);

		if (dependencyRef === undefined) {
			throw `Dependency could not be found: ${token}`;
		}

		let instance = dependencyRef.getInstance();
		if (instance === undefined) {
			instance = Injector.construct(dependencyRef.item, dependencyRef.dependencies, dependencyRef.args);
			if (dependencyRef.isSingleton()) {
				dependencyRef.setInstance(instance);
			}
		}

		return instance as T;
	}

	getDependency<T>(token: string): Dependency<T> {
		return this.dependencies.find((d) => d.token === token) as Dependency<T>;
	}

	construct<T>(dependent: IDependency<T>, tokens: string[] = [], args: unknown[] = []): T {
		let dependencies: unknown[] = [];

		if (tokens.length > 0) {
			tokens.forEach((token) => {
				const dependencyRef: Dependency<T> = this.getDependency(token);

				let dependency = dependencyRef.getInstance();
				if ((dependencyRef.isSingleton() && dependency === null) || !dependencyRef.isSingleton()) {
					dependency = this.construct(dependencyRef.item, dependencyRef.dependencies, dependencyRef.args);
				}

				if (dependencyRef.isSingleton() && dependencyRef.getInstance() === null) {
					dependencyRef.setInstance(dependency);
				}

				dependencies.push(dependency);
			});
		}

		if (args.length > 0) {
			dependencies = dependencies.concat(args);
		}

		return Reflect.construct(dependent, dependencies);
	}
}

export const Injector = new InjectionEngine();
