const { Map, Set } = globalThis;

/**
 * A class representing a lazy collector.
 * @example
 * const myCollection = new LazyStoresCollection();
 * myCollection.fruits.add('apple').add('banana');
 * console.log(myCollection.fruits); // 𝘖𝘶𝘵𝘱𝘶𝘵: Set(2) '𝖺𝗉𝗉𝗅𝖾','𝖻𝖺𝗇𝖺𝗇𝖺'
 */
// prettier-ignore
export default class LazyStoresCollection {
	static hasHandler = (collection, key) => collection.has(key);
	static getHandler = (collection, key) => {
		let e;
		switch (key) {
			case 'delete':
				e = value => collection.delete(value);
				break;
			case 'entries':
				e = () => collection.entries();
				break;
			case 'clear':
				e = () => {
					collection.clear();
				};
				break;
			case 'forEach':
				e = fn => {
					collection.forEach(fn);
				};
				break;
			case 'size':
				e = collection.size;
				break;
			default:
				// noinspection CommaExpressionJS
				(e = collection.get(key)) || (
					e = new Set(),
					collection.set(key, e)
				);
		}
		return e;
	};
	#collection;
	constructor() {
		return new Proxy((this.#collection = new Map()), {
			has: LazyStoresCollection.hasHandler,
			get: LazyStoresCollection.getHandler
		});
	}
}
