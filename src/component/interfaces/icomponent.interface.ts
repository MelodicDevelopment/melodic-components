import { INewable } from '../../interfaces/inewable.interface';

export interface IComponent<T> extends INewable<T> {
	onInit?: () => void;
	onCreate?: () => void;
	onRender?: () => void;
	onDestroy?: () => void;
	onAttributeChange?: (attribute: string, oldVal: unknown, newVal: unknown) => void;
	onPropertyChange?: (property: string, oldVal: unknown, newVal: unknown) => void;
}
