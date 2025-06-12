const user = {
    name: "Alice",
    email: "alice@example.com"
};
const users = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
    { name: "Charlie", email: "charlie@example.com" },
    { name: "Dana", email: "dana@example.com" },
    { name: "Eve", email: "eve@example.com" }
];

// console.log(users.splice(1,3))
// console.log(users)


// const startWithCUsers = users.filter((u) => u.name.startsWith("C")).map(u => u.name).join(",")
//
//
// console.log(startWithCUsers)
// console.log(Object.keys(user));
// // Output: ['name', 'email']
// console.log(Object.values(user));
// // Output: ['Alice', 'alice@example.com']
// console.log(Object.entries(user));
/* Output:
[
  ['name', 'Alice'],
  ['email', 'alice@example.com'],
]
*/
// for (const [key, value] of Object.entries(user)) {
//     console.log(`${key}: ${value}`);
// }
// Output:
// name: Alice
// email: alice@example.com

// const map = new Map();
//
// // Add key-value pairs
// map.set('name', 'Alice');
// map.set(123, 'a number key');
// map.set(true, 'a boolean key');
//
// // Get values by key
// console.log(map.get('name'));   // Alice
// console.log(map.get(123));      // a number key
//
// // Check if a key exists
// console.log(map.has(true));     // true
//
// // Size of the Map
// console.log(map.size);           // 3
//
// // Delete a key
// map.delete(123);
//
// // Iterate over map entries
// for (const [key, value] of map) {
//     console.log(`${key} => ${value}`);
// }
//
// // Clear all entries
// map.clear();
// console.log(map.size);           // 0
//
// const user1 = { id: 1, name: 'Alice' };
// const user2 = { id: 2, name: 'Bob' };
//
// const userMap = new Map();
//
// userMap.set(user1.id, user1);
// userMap.set(user2.id, user2);
//
// console.log(userMap.get(1)); // { id: 1, name: 'Alice' }
// console.log(userMap.get(2)); // { id: 2, name: 'Bob' }



// const str = " hello world ";
// console.log(str.slice(1,3))
// const arr = str.split("");
// console.log(arr)
// console.log(arr.indexOf("e"))
//
//
// const str2 =arr.join("")
// console.log(str2)

