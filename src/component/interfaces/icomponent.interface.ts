import { Component } from '../component.class';
import { IElementMeta } from './ielement-meta.interface';

export type IComponent<T extends Component> = {
	new (...args: any[]): T;
	meta: IElementMeta;
	observedAttributes: string[];
	register(meta: IElementMeta): <T extends Component>(component: IComponent<T>) => IComponent<T>;
};
