import { html, TemplateResult } from '@melodic/component';
import { AppComponent } from './my-app.component';

export const template = (_: AppComponent): TemplateResult => html`
<my-first>
	<div>Test 1</div>
</my-first>

<my-second></my-second>
`;
