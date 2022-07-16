import { render, TemplateResult } from 'lit-html';
import { IComponent } from './interfaces/icomponent.interface';
import { IElementMeta } from './interfaces/ielement-meta.interface';

export abstract class Component extends HTMLElement {
	#root: ShadowRoot;
	#style: HTMLStyleElement;

	constructor() {
		super();

		this.#root = this.attachShadow({ mode: 'open' });
		this.#style = this.#attachStyle();
	}

	connectedCallback(): void {
		this.#observe();
		this.render();
	}

	disconnectedCallback(): void {}

	adoptedCallback(): void {}

	attributeChangedCallback(attribute: string, _: unknown, newVal: unknown): void {
		if (this[attribute as keyof this] !== undefined) {
			(this[attribute as keyof this] as unknown) = newVal;
		}

		this.render();
	}

	render(): void {
		const template: ((...args: any[]) => TemplateResult) | null = this.#getTemplate();
		const styles: ((...args: any[]) => TemplateResult) | null = this.#getStyles();
		const attributes: Record<string, string> = this.#getAttributeValues();

		if (template) {
			render(template(this, attributes), this.#root);
		}

		if (styles) {
			render(styles(this, attributes), this.#style);
		}
	}

	#attachStyle(): HTMLStyleElement {
		const styleNode: HTMLStyleElement = document.createElement('style');
		return this.#root.appendChild(styleNode);
	}

	#observe(): void {
		const properties: string[] = Object.getOwnPropertyNames(this);
		properties.forEach((prop) => {
			let _val: unknown = (this as any)[prop];

			const getter = () => _val;
			const setter = (newVal: unknown) => {
				if (_val !== newVal) {
					_val = newVal;

					this.render();
				}
			};

			Object.defineProperty(this, prop, { get: getter, set: setter });
		});
	}

	#getTemplate(): ((...args: any[]) => TemplateResult) | null {
		const meta: IElementMeta = Reflect.get(this.constructor, 'meta');
		const template = meta.template;

		if (typeof template === 'string') {
			return () => template;
		}

		return template ?? null;
	}

	#getStyles(): ((...args: any[]) => TemplateResult) | null {
		const meta: IElementMeta = Reflect.get(this.constructor, 'meta');
		const styles = meta.styles;

		if (typeof styles === 'string') {
			return () => styles;
		}

		return styles ?? null;
	}

	#getAttributeValues(): Record<string, string> {
		const attributes: Record<string, string> = {};
		this.getAttributeNames().forEach((attrName: string) => {
			attributes[attrName] = this.getAttribute(attrName) ?? '';
		});

		return attributes;
	}

	static meta: IElementMeta;
	static observedAttributes: string[] = [];

	static register(meta: IElementMeta): <T extends Component>(component: IComponent<T>) => IComponent<T> {
		return function <T extends Component>(component: IComponent<T>): IComponent<T> {
			if (window.customElements.get(meta.selector) === undefined) {
				component.meta = meta;
				component.observedAttributes = meta.attributes ?? [];

				window.customElements.define(meta.selector, component);
			}

			return component;
		};
	}
}
