export interface Command {
	name: string;
	url: string;
	searchTemplate?: string;
}

export type Commands = Record<string, Command>;
