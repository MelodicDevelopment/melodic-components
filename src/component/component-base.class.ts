import { render, TemplateResult } from 'lit-html';
import { IComponent } from './interfaces/icomponent.interface';
import { IElementMeta } from './interfaces/ielement-meta.interface';

export abstract class ComponentBase<T> extends HTMLElement {
	#root: ShadowRoot;
	#style: HTMLStyleElement;
	#meta: IElementMeta;
	#component: IComponent<T>;

	constructor(meta: IElementMeta, component: IComponent<T>) {
		super();

		this.#root = this.attachShadow({ mode: 'open' });
		this.#style = this.#attachStyle();
		this.#meta = meta;
		this.#component = component;
	}

	connectedCallback(): void {
		this.#observe();
		this.render();

		if (this.#component.onCreate !== undefined) {
			this.#component.onCreate();
		}
	}

	disconnectedCallback(): void {
		if (this.#component.onDestroy !== undefined) {
			this.#component.onDestroy();
		}
	}

	attributeChangedCallback(attribute: string, oldVal: unknown, newVal: unknown): void {
		if (this[attribute as keyof this] !== undefined) {
			(this[attribute as keyof this] as unknown) = newVal;
		}

		this.render();

		if (this.#component.onAttributeChange !== undefined) {
			this.#component.onAttributeChange(attribute, oldVal, newVal);
		}
	}

	render(): void {
		const template: ((...args: any[]) => TemplateResult) | null = this.#getTemplate();
		const styles: ((...args: any[]) => TemplateResult) | null = this.#getStyles();
		const attributes: Record<string, string> = this.#getAttributeValues();

		if (template) {
			render(template(this.#component, attributes), this.#root);
		}

		if (styles) {
			render(styles(this.#component, attributes), this.#style);
		}

		if (this.#component.onRender !== undefined) {
			this.#component.onRender();
		}
	}

	#attachStyle(): HTMLStyleElement {
		const styleNode: HTMLStyleElement = document.createElement('style');
		return this.#root.appendChild(styleNode);
	}

	#observe(): void {
		const properties: string[] = Object.getOwnPropertyNames(this.#component);
		properties.forEach((prop) => {
			const self: any = this;

			let _val: unknown = (this.#component as any)[prop];

			if (self[prop] !== undefined) {
				_val = self[prop];
			}

			const getter = () => _val;
			const setter = (newVal: unknown) => {
				if (_val !== newVal) {
					if (this.#component.onPropertyChange !== undefined) {
						this.#component.onPropertyChange(prop, _val, newVal);
					}

					_val = newVal;
					this.render();
				}
			};

			Object.defineProperty(this.#component, prop, { get: getter, set: setter });
		});
	}

	#getTemplate(): ((...args: any[]) => TemplateResult) | null {
		const template = this.#meta.template;

		if (typeof template === 'string') {
			return () => template;
		}

		return template ?? null;
	}

	#getStyles(): ((...args: any[]) => TemplateResult) | null {
		const styles = this.#meta.styles;

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
}
