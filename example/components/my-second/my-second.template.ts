import { html, TemplateResult } from 'lit-html';

export const template = (): TemplateResult => html`
	<my-first .age="${50}">
		<div>Test 2</div>
	</my-first>
`;
