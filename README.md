# LazyStoresCollection
A class representing a lazy collector:
- provides a lazy storage mechanism using JavaScript `Proxy`
- supports common collection operations like adding, deleting, iterating, and clearing
- values are stored internally in a `Map`

### Methods
- `clear()`: Clears all items from the collection.
- `delete(key)`: Deletes the item with the specified key.
- `entries()`: Returns an iterator object containing all key/value pairs.
- `forEach(callback)`: Executes a provided function once per each key/value pair.
- `size`: Returns the number of items in the collection.

### Example
```javascript
import LazyStoresCollection from 'lazy-stores-collection';

const myCollection = new LazyStoresCollection();
myCollection.fruits.add('apple').add('banana');
console.log(myCollection.fruits); // Output: Set(2) {'apple','banana'}
```
