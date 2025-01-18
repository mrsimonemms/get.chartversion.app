import { URL } from 'node:url';

export interface IDockerOpts {
	url: string;
	insecure?: boolean;
	scope?: string;
}

export interface IDockerTag {
	name: string;
	tags: string[];
}

export interface IDockerError {
	code: string;
	message: string;
	detail: {
		Type: string;
		Class: string;
		Name: string;
		Action: string;
	}[];
}

export class DockerClient {
	protected name: string;

	protected url: URL;

	protected isLoggedIn: boolean = false;

	protected loggedInScope?: string;

	constructor(protected opts: IDockerOpts) {
		this.opts.url = this.opts.url.replace(/^oci:/, 'https:');
		this.url = new URL(this.opts.url);
		this.name = this.url.pathname.replace(/^\//, '');
	}

	async listTags(): Promise<IDockerTag> {
		await this.login();

		const res = await fetch(
			`https://${this.opts.url.host}/v2/${encodeURI(this.name)}/tags/list`,
			{
				method: 'GET',
				headers: {},
			},
		);

		const { data, errors } = await res.json<{
			data: IDockerOpts;
			errors: IDockerError[];
		}>();

		if (!res.ok) {
			throw new Error(errors?.map((e) => e.message).join('\n') ?? 'unknown');
		}

		console.log({ data });

		return {
			name: this.name,
			tags: [],
		};
	}

	async login() {
		let { scope } = this.opts;

		if (!scope) {
			const resource = 'repository';
			const actions = ['pull'];
			scope = this.makeScope(resource, this.name, actions);
		}

		if (this.isLoggedIn && this.loggedInScope === scope) {
			return;
		}

		await this.ping();
	}

	async ping(): Promise<Response> {
		const url = new URL(this.opts.url.toString());
		url.pathname = '/v2/';

		const res = await fetch(url.toString(), {
			method: 'GET',
		});

		return res;
	}

	private makeScope(resource: string, name: string, actions: string[]): string {
		return `${resource}:${name}:${actions.join(',')}`;
	}
}
