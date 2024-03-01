const expect = require("chai").expect;
const request = require("supertest");
const orderModel = require("../apps/models/order.model");
const app = require("../app");
const mongoose = require('mongoose');

let orderId = "";

describe("/", () => {
    before(async () => {

        await orderModel.deleteMany({});
    });

    after(async () => {
        // await courseModel.deleteMany({});
        console.log("ket thuc")
        // mongoose.disconnect();
    });

    describe("POST /", () => {
        it("should return order when the all request body is valid", async () => {
            const res = await request(app)
                .post("/api/orders")
                .send({
                    note: "Fast Delivery",


                });
            const data = res.body;
            console.log(data.data)
            expect(res.status).to.equal(201);
            expect(data.data).to.have.property("_id");
            expect(data.data).to.have.property("note", "Fast Delivery");

            const order = await orderModel.findOne({ note: "Fast Delivery" });
            expect(order.note).to.equal("Fast Delivery");

        });
    });

    describe("GET /", () => {
        it("should return all order", async () => {

            const orders = [
                {
                    note: "Low Delivery",
                },
                {
                    note: "More Sauces",


                }];
            await orderModel.insertMany(orders);
            const res = await request(app).get("/api/orders");
            console.log(res.body)
            expect(res.status).to.equal(200);
            expect(res.body.data.length).to.equal(3);
        });
    });

    describe("GET/:id", () => {
        it("should return a order if valid id is passed", async () => {
            const order = new orderModel({
                _id: new mongoose.Types.ObjectId(),
                note: "Low Delivery"


            });
            await order.save();
            const res = await request(app).get("/api/orders/" + order._id);
            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.property("note", "Low Delivery");
        });

        it("should return 400 error when invalid object id is passed", async () => {
            const res = await request(app).get("/api/orders/1");
            expect(res.status).to.equal(400);
        });

        it("should return 404 error when valid object id is passed but does not exist", async () => {
            const res = await request(app).get("/api/orders/5f43ef20c1d4a133e4628181");
            expect(res.status).to.equal(404);
        });
    });

    describe("PUT /:id", () => {
        it("should update the existing order and return 200", async () => {

            const order = new orderModel({
                _id: new mongoose.Types.ObjectId(),
                note: "Low Delivery"
            });
            await order.save();

            const res = await request(app)
                .put("/api/orders/" + order._id)
                .send({
                    note: "Quick Delivery"
                });


            expect(res.status).to.equal(200);
            const orderUpdated = await orderModel.findOne({ _id: order._id });
            console.log(orderUpdated)
            expect(orderUpdated).to.have.property("note", "Quick Delivery");
        });
    });

    describe("DELETE /:id", () => {
        it("should delete requested id and return response 200", async () => {

            const order = new orderModel({
                _id: new mongoose.Types.ObjectId(),
                note: "Low Delivery"
            });
            await order.save();
            orderId = order._id;
            const res = await request(app).delete("/api/orders/" + orderId);
            expect(res.status).to.be.equal(200);
        });

        it("should return 404 when deleted course is requested", async () => {
            let res = await request(app).get("/api/orders/" + orderId);
            expect(res.status).to.be.equal(404);
        });
    });


})