const expect = require("chai").expect;
const request = require("supertest");
const productTypeModel = require("../apps/models/productType.model");
const app = require("../app");
const mongoose = require('mongoose');

let productTypeId = "";

describe("/", () => {
    before(async () => {
        await productTypeModel.deleteMany({});
    });

    after(async () => {

        mongoose.disconnect();
    });

    it("should connect and disconnect to mongodb", async () => {
        // console.log(mongoose.connection.states);
        mongoose.disconnect();
        mongoose.connection.on('disconnected', () => {
            expect(mongoose.connection.readyState).to.equal(0);
        });
        mongoose.connection.on('connected', () => {
            expect(mongoose.connection.readyState).to.equal(1);
        });
        mongoose.connection.on('error', () => {
            expect(mongoose.connection.readyState).to.equal(99);
        });

        await mongoose.connect("mongodb://127.0.0.1:27017/CRUD_Shop24h");
    });

    describe("POST /", () => {
        it("should return productType when the all request body is valid", async () => {
            const res = await request(app)
                .post("/api/productTypes")
                .send({
                    name: "A",
                    description: "Type A",

                });
            const data = res.body;
            console.log(data.data)
            expect(res.status).to.equal(201);
            expect(data.data).to.have.property("_id");
            expect(data.data).to.have.property("name", "A");
            expect(data.data).to.have.property("description", "Type A");

            const productType = await productTypeModel.findOne({ name: "A" });
            expect(productType.name).to.equal('A');
            expect(productType.description).to.equal("Type A");

        });
    });

    describe("GET /", () => {
        it("should return all productType", async () => {
            const productTypes = [
                { name: "B", description: "Type B" },
                { name: "C", description: "Type C" }
            ];
            await productTypeModel.insertMany(productTypes);
            const res = await request(app).get("/api/productTypes");
            console.log(res.body)
            expect(res.status).to.equal(200);
            expect(res.body.data.length).to.equal(3);
        });
    });

    describe("GET/:id", () => {
        it("should return a productType if valid id is passed", async () => {
            const productType = new productTypeModel({
                _id: new mongoose.Types.ObjectId(),
                name: "D",
                description: "Type D"
            });
            await productType.save();
            const res = await request(app).get("/api/productTypes/" + productType._id);
            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.property("name", "D");
        });

        it("should return 400 error when invalid object id is passed", async () => {
            const res = await request(app).get("/api/productTypes/1");
            expect(res.status).to.equal(400);
        });

        it("should return 404 error when valid object id is passed but does not exist", async () => {
            const res = await request(app).get("/api/productTypes/5f43ef20c1d4a133e4628181");
            expect(res.status).to.equal(404);
        });
    });

    describe("DELETE /:id", () => {
        it("should delete requested id and return response 200", async () => {
            const productType = new productTypeModel({
                _id: new mongoose.Types.ObjectId(),
                name: "E",
                description: "Type E"
            });
            await productType.save();
            productTypeId = productType._id;
            const res = await request(app).delete("/api/productTypes/" + productTypeId);
            expect(res.status).to.be.equal(200);
        });

        it("should return 404 when deleted course is requested", async () => {
            let res = await request(app).get("/api/productTypes/" + productTypeId);
            expect(res.status).to.be.equal(404);
        });
    });

})