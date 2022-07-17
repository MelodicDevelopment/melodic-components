export type IComponent<T> = {
	new (...args: any[]): T;

	onInit?: () => void;
	onCreate?: () => void;
	onRender?: () => void;
	onDestroy?: () => void;
	onAttributeChange?: (attribute: string, oldVal: unknown, newVal: unknown) => void;
	onPropertyChange?: (property: string, oldVal: unknown, newVal: unknown) => void;
};
