process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");

let items = require("../fakeDb");

let item1 = { "name": "chocolate","price": 1.50 }
let item2 = { "name": "vanilla", "price": 1.75 }

beforeEach(function() {
  items.push(item1);
  // items.push(item2)
});

afterEach(function() {
  // make sure this *mutates*, not redefines, `cats`
  items.length = 0;
});

// Gettin all items
// Get /items - returns {items: [{"name":"abc", "price": 1.50}]}
describe("GET /items", () => {
  test("Return all popsicles", async function() {
    const res = await request(app).get('/items')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({items: [{ "name": "chocolate","price": 1.50 } ]})
  })
})

// expect(res.body).toEqual([{ "name": "chocolate","price": 1.50 },
// { "name": "vanilla", "price": 1.75 }
// ])

// Getting a single item
// - Does it successfully retrieve/return a single item
describe("GET /items/chocolate", ()=> {
  test("Return a specific popsicle by name", async function() {
    const res = await request(app).get('/items/chocolate')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({item: { "name": "chocolate","price": 1.50 } })
  })
})
// - What if it can't find the item requested
describe("GET /items/strawberry", ()=> {
  test("Fails to find named popsicle", async function() {
    const res = await request(app).get('/items/strawberry')
    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({"error":{"message":"Not Found","status":404},"message":"Not Found"})
  })
})


// Add a new item 
// - Is the single item added successfully (statusCode = 201, item actually added and new item added is returned in response)
describe("POST /item", ()=> {
  test("Successfully add a new popsicle", async function() {
    const res = await request(app)
      .post('/items')
      .send({ "name": "vanilla", "price": 1.75 })
    expect(res.statusCode).toBe(201)
    expect(res.body).toEqual({"item": { "name": "vanilla", "price": 1.75 }})
  })
})
// - What happens when blank item is added?
// - What happens if user attempts to add an invalid item
// - What happens when the user attemps to add a duplicate

// Update an existing item 
// - Is the item updated successfully (changes reflected in response)
describe("PATCH /item/:name", ()=> {
  test("Successfully update an existing popsicle", async function() {
    const res = await request(app)
      .patch('/items/chocolate')
      .send({ "name": "chocolate", "price": 2.00 })
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({"item": { "name": "chocolate", "price": 2.00 }})
  })
})
// - What if the item to be updated cannot be found
describe("PATCH /items/:name", ()=> {
  test("Popsicle to be updated not found", async function() {
    const res = await request(app)
      .patch('/items/strawberry')
      .send({ "name": "strawberry", "price": 2.00 })
    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({"error":{"message":"Not Found","status":404},"message":"Not Found"})
  })
})
// - What if user specifies they want to update item with an invalid field (e.g., price is missing, zero or negative)

// Delete an existing item
// - Is the item deleted successfully (Deleted response)
describe("DELETE /items/:name", ()=> {
  test("Successfully deleted existing popsicle", async function() {
    const res = await request(app)
      .delete('/items/chocolate')
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({message:'Deleted'})
  })
})
// - What if the item cannot be found 
describe("DELETE /items/:name", ()=> {
  test("Popsicle to be delted can't be found", async function() {
    const res = await request(app)
      .delete('/items/strawberry')
    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({"error":{"message":"Not Found","status":404},"message":"Not Found"})
  })
})