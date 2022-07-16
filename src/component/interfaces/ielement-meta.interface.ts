import { TemplateResult } from 'lit-html';

export interface IElementMeta {
	selector: string;
	styles?: (component: any, attributes?: Record<string, string>) => TemplateResult;
	template?: (component: any, attributes?: Record<string, string>) => TemplateResult;
	attributes?: string[];
}
