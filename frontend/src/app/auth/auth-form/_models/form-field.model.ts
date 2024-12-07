export interface FormField {
	id: string;
	type: 'text' | 'password';
	label: string;
	placeholder: string;
	required: boolean;
}
