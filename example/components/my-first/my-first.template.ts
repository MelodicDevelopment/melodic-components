import { html, TemplateResult } from '@melodic/component';
import { MyFirstComponent } from './my-first.component';

export const template = (component: MyFirstComponent): TemplateResult => html`
	<span>${component.getMessage()}</span>
	<slot></slot>
	<button @click="${() => component.testMethod()}">Coming Soon</button>
`;
