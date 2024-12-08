export class User {
	constructor(
		private login: string,
		private token: string,
		private tokenExpirationDate: Date
	) {}

	get tokenFunc(): string | null {
		if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
			return null;
		}
		return this.token;
	}

	get loginFunc(): string {
		return this.login;
	}
}
