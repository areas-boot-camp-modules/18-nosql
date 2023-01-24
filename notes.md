# Module 18: NoSQL
- [18.1: MongoDB](#18.1-mongodb)
- [18.2: Introduction to Mongoose](#18.2-introduction-to-mongoose)
- [18.3: Advanced Mongoose](#18.3-advanced-mongoose)

---
- NoSQL is any database that isn’t a relational database.
- For example, document (key-value stores) and graph (column-oriented) databases.
- NoSQL is good for flexibility.

## 18.1: MongoDB
- Mongo stores data as JSON.
- Uses binary JSON.
- Good match with JavaScript.
- You work with objects and key-value pairs.
- No tables. There are collections, instead.
- No schema.
- There are also embedded documents.
- Is an embedded doc a object within an object?
- Related data is nested in embedded doc.
- You can change data structure as you go.
- It scales easily.
- You can add a schema and change it later without needing to rebuild your entire database.

### Compass
- What’s a collection?
- Mongo doesn’t actually store databases, it stores collections.
- Collections are equivalent to tables.
- Collections hold objects, looks like.
- Mongo behaves a lot like JavaScript.

---
### Create, Read
- For our projects, we install `mongodb`.
- There’s a bunch of things that are different in the `server.js` file.
- There’s `insertOne()`, `insertMany()`, and `find()`.
- It’s very object-oriented.
- You add documents not rows.

```
db.collection("petCollection")
	.find()
	.toArray((err, results) => {
		if (err) throw err
		res.json(results)
	})
```

---
### Update, Delete
- There’s `updateOne()` also:

```
db.collection.updateOne(
	{ "item": "banana" },
	{$set: { "item": "apple" }}
)
```

- And `deleteOne()`:

```
db.collection.deleteOne({ "_id": ObjectId("32453563657456") })
```

---
### Embedded Documents
- You can create relationship between documents with a key that has the same value.
- Or you can use embedded documents.
- You can create one-to-one and one-to-many.
- You can access embedded documents with dot notation (similar to JavaScript).
- If you find an embedded object that matches your criteria, it will return the entire object/document (I think).
- When you change your data structure, you can use versions to manage changes to the data structures.

---
### Cursor Methods
- You can use this to control how data is returned. Mongo uses `sort()`, `skip()`, and `limit()` to do this.
- `skip()` is similar to SQL `OFFSET`.

---
## 18.2: Introduction to Mongoose
- Mongoose is analogous to Sequelize.
- Read the docs to truly understand the difference!

### Models Schemas
```
const groceryShema = new mongoose.Schema({
	item: { type: String, required: true },
	stockCount: Number,
	price: Number,
	inStock: Boolean,
	lastAccessed: { type: Date, default: Date.now },
})

const Item = mongoode.model("Item", grocerySchema)

const handleError = (err) => console.error(err)

Item.create(
	{
		item: "banana",
		stockCount: 10,
		price: 1,
		inStock: true,
	},
	(err) => {
		if (err) {
			handleError(err)
		} else {
			...
		}
	}
)
```

---
### CRUD Mongoose
- Mongoose comes with Mongo, so you only need to install it as a dependency.

```
app.post("/new-dept/:dept", (req, res) => {
	const newDept = new Department({ name: req.params.department })
	newDept.save()
	...
})
```
---
### Models Instances Methods
```
const Dept = mongoose.model("Dept", deptSchema)
const produce = new Dept({ name: "Produce", totalStock: 100 })
```
---
### Subdocuments
- Subdocuments are like JOINs.
- The end result is there are docs with their own IDs in a complex object.
 
```
const managerSchema = new mongoose.Schema({
	name: { type: String, required: true },
	salary: Number,
})

const employeeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	salary: Number,
}) 

const departmentSchema = new mongoose.Schema({
	name: { type: String, required: true},
	manager: { type: managerSchema, required: true},
	employees: [employeeSchema],
	lastAccessed: { type: Date, default: Date.now }
})
```

---
### Aggregates
- Similar to GROUP BY, COUNT, SUM, etc.
- Look at 14 for how to not duplicate data.

```
app.get("sum-price", (req, res) => {
	Item.aggregate(
		[
			{ $match: { price: { $lte: 5 } } },
			{
				$group: {
					_id: null,
					sum_price: { $sum: "$price" },
					avg_price: { $avg: "$price" },
					max_price: { $max: "$price" },
					min_price: { $min: "$price" },
				},
			},
		]
		(err, result) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.status(200).send(result)	
			}
		}
	)
})
```

---
## 18.3: Advanced Mongoose

### Virtual

---
### Subdoc Population

---
### CRUD Subdoc

---
### GitHub Packages

---
### Mini-Project

---
