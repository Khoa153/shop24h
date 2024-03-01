const expect = require("chai").expect;
const request = require("supertest");
const productModel = require("../apps/models/product.model");
const productTypeModel = require("../apps/models/productType.model")
const app = require("../app");
const mongoose = require('mongoose');

let productId = "";

describe("/", () => {
    before(async () => {

        await productModel.deleteMany({});
    });

    after(async () => {
        // await courseModel.deleteMany({});
        console.log("ket thuc")
        // mongoose.disconnect();
    });

    it("should connect and disconnect to mongodb", async () => {
        // console.log(mongoose.connection.states);
        mongoose.disconnect();
        console.log("da qa day")
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
        it("should return product when the all request body is valid", async () => {
            const productType = await productTypeModel.findOne().skip(0);
            console.log(productType)
            const res = await request(app)
                .post("/api/products")
                .send({
                    name: "iphone",
                    description: "Iphone 14 PM",
                    type: productType._id,
                    imageUrl: "######",
                    buyPrice: 1000,
                    promotionPrice: 900,
                    amount: 2

                });
            const data = res.body;
            console.log(data.data)
            expect(res.status).to.equal(201);
            expect(data.data).to.have.property("_id");
            expect(data.data).to.have.property("name", "iphone");
            expect(data.data).to.have.property("description", "Iphone 14 PM");
            expect(data.data).to.have.property("imageUrl", "######");

            const product = await productModel.findOne({ name: "iphone" });
            expect(product.name).to.equal('iphone');
            expect(product.description).to.equal("Iphone 14 PM");

        });
    });

    describe("GET /", () => {
        it("should return all productType", async () => {
            const productType = await productTypeModel.findOne().skip(0);

            const products = [
                { name: "ipad", description: "Ipad pro Gen 5", type: productType._id, imageUrl: "######", buyPrice: 1000, promotionPrice: 900, amount: 2 },
                { name: "headphone", description: "airpod max ", type: productType._id, imageUrl: "######", buyPrice: 1000, promotionPrice: 900, amount: 2 },
            ];
            await productModel.insertMany(products);
            const res = await request(app).get("/api/products");
            console.log(res.body)
            expect(res.status).to.equal(200);
            expect(res.body.data.length).to.equal(3);
        });
    });

    describe("GET/:id", () => {
        it("should return a product if valid id is passed", async () => {
            const productType = await productTypeModel.findOne().skip(0);

            const product = new productModel({
                _id: new mongoose.Types.ObjectId(),
                name: "SH150i",
                description: "Xe tay ga SH",
                type: productType._id,
                imageUrl: "######",
                buyPrice: 1000,
                promotionPrice: 900,
                amount: 2

            });
            await product.save();
            const res = await request(app).get("/api/products/" + product._id);
            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.property("name", "SH150i");
        });

        it("should return 400 error when invalid object id is passed", async () => {
            const res = await request(app).get("/api/products/1");
            expect(res.status).to.equal(400);
        });

        it("should return 404 error when valid object id is passed but does not exist", async () => {
            const res = await request(app).get("/api/products/5f43ef20c1d4a133e4628181");
            expect(res.status).to.equal(404);
        });
    });

    describe("PUT /:id", () => {
        it("should update the existing product and return 200", async () => {
            const productType = await productTypeModel.findOne().skip(0);

            const product = new productModel({
                _id: new mongoose.Types.ObjectId(),
                name: "Laptop",
                description: "Laptop ASUS",
                type: productType._id,
                imageUrl: "######",
                buyPrice: 1000,
                promotionPrice: 900,
                amount: 2
            });
            await product.save();

            const res = await request(app)
                .put("/api/products/" + product._id)
                .send({
                    name: "Laptop ASUS 4090ti",
                    description: "Laptop ASUS",
                    type: productType._id,
                    imageUrl: "######",
                    buyPrice: 1500,
                    promotionPrice: 900,
                    amount: 2
                });


            expect(res.status).to.equal(200);
            const productUpdated = await productModel.findOne({ _id: product._id });
            console.log(productUpdated)
            expect(productUpdated).to.have.property("name", "Laptop ASUS 4090ti");
            expect(productUpdated).to.have.property("buyPrice", 1500);
        });
    });

    describe("DELETE /:id", () => {
        it("should delete requested id and return response 200", async () => {
            const productType = await productTypeModel.findOne().skip(0);

            const product = new productModel({
                _id: new mongoose.Types.ObjectId(),
                name: "Mashall",
                description: "Loa de ban",
                type: productType._id,
                imageUrl: "######",
                buyPrice: 1000,
                promotionPrice: 900,
                amount: 2
            });
            await product.save();
            productId = product._id;
            const res = await request(app).delete("/api/products/" + productId);
            expect(res.status).to.be.equal(200);
        });

        it("should return 404 when deleted course is requested", async () => {
            let res = await request(app).get("/api/products/" + productId);
            expect(res.status).to.be.equal(404);
        });
    });

})
