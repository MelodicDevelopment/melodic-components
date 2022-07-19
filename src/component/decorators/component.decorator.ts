import { ComponentBase } from '../component-base.class';
import { IElementMeta, IComponent } from '../interfaces';

export function Component(meta: IElementMeta): <T>(component: IComponent<T>) => IComponent<T> {
	return function <T>(component: IComponent<T>): IComponent<T> {
		if (customElements.get(meta.selector) === undefined) {
			const webComponent = class extends ComponentBase<T> {
				constructor() {
					super(meta, Reflect.construct(component, component.params ?? []));
				}

				static observedAttributes: string[] = meta.attributes ?? [];
			};

			customElements.define(meta.selector, webComponent);
		}

		return component;
	};
}
