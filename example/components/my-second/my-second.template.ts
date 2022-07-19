import { html, TemplateResult } from '@melodic/component';
import { MySecondComponent } from './my-second.component';

export const template = (c: MySecondComponent): TemplateResult => html`
	<my-first .age="${c.myAge}">
		<div>Test 2</div>
	</my-first>
`;
