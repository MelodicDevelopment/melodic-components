export interface INewable<T> {
	new (...args: any[]): T;
	params?: unknown[];
}
