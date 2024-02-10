import LazyStoresCollection from './LazyStoresCollection.mjs';

describe('LazyStoresCollection', () => {
	const keyBar = 'bar';
	const keyBaz = 'baz';
	const fooKey = 'foo';
	it('should lazily initialize properties as Sets', () => {
		const store = new LazyStoresCollection();
		const foo = store.foo;
		expect(foo).toBeInstanceOf(Set);
		expect(foo.size).toBe(0);
		expect(store.foo).toBe(foo);
		foo.add(keyBar).add(keyBaz);
		expect(foo.has(keyBar)).toBe(true);
		expect(foo.has(keyBaz)).toBe(true);
		expect(foo.size).toBe(2);
		const xxx = store.xxx;
		expect(xxx).toBeInstanceOf(Set);
		expect(xxx.size).toBe(0);
	});
	it('should allow adding and deleting elements from Sets', () => {
		const store = new LazyStoresCollection();
		const foo = store.foo;
		foo.add(keyBar).add(keyBaz);
		expect(foo.has(keyBar)).toBe(true);
		expect(foo.has(keyBaz)).toBe(true);
		foo.delete(keyBar);
		expect(foo.has(keyBar)).toBe(false);
		expect(foo.has(keyBaz)).toBe(true);
		expect(foo.size).toBe(1);
	});
	it('should handle multiple instances of LazyStoresCollection independently', () => {
		const store1 = new LazyStoresCollection();
		const store2 = new LazyStoresCollection();
		store1.xxx.add(keyBar);
		expect(store1.xxx.has(keyBar)).toBe(true);
		expect(store2.xxx.has(keyBar)).toBe(false);
	});
	it('should handle different types of property names', () => {
		const store = new LazyStoresCollection();
		const foo = store[fooKey];
		expect(foo).toBeInstanceOf(Set);
		expect(store[fooKey]).toBe(foo);
		const barKey = Symbol('symbol');
		const bar = store[barKey];
		expect(bar).toBeInstanceOf(Set);
		expect(store[barKey]).toBe(bar);
	});
	it('should allow deleting and clearing Sets', () => {
		const store = new LazyStoresCollection();
		const foo1 = store.foo;
		expect(foo1.size).toBe(0);
		foo1.add(keyBar).add(keyBaz);
		expect(foo1.size).toBe(2);
		store.delete('foo');
		expect(foo1.has(keyBar)).toBe(true);
		expect(foo1.has(keyBaz)).toBe(true);
		expect(foo1.size).toBe(2);
		expect(store.size).toBe(0);
		expect(store.foo.size).toBe(0);
		expect(store.size).toBe(1);
		const foo2 = store.foo;
		expect(store.size).toBe(1);
		expect(foo2 instanceof Set).toBeTruthy();
		expect(foo2 !== foo1).toBe(true);
		expect(foo2.has(keyBar)).toBe(false);
		foo2.add(keyBar).add(keyBaz);
		expect(foo2.size).toBe(2);
		foo2.clear();
		expect(foo2.size).toBe(0);
	});
	it('should iterate over stored elements', () => {
		const store = new LazyStoresCollection();
		const foo = store.foo;
		foo.add(keyBar).add(keyBaz);
		store.xxx.add('123');
		const storeEntries1 = [];
		store.forEach((value, key) => {
			storeEntries1.push([key, value]);
		});
		expect(storeEntries1).toEqual([
			[fooKey, foo],
			['xxx', store.xxx]
		]);
		const storeEntries2 = [];
		for (const entry of store.entries()) {
			storeEntries2.push(entry);
		}
		expect(storeEntries2).toEqual(storeEntries1);
	});
});
