const expect = require("chai").expect;
const request = require("supertest");
const customerModel = require("../apps/models/customer.model");
const app = require("../app");
const mongoose = require('mongoose');

let customerId = "";

describe("/", () => {
    before(async () => {

        await customerModel.deleteMany({});
    });

    after(async () => {
        // await courseModel.deleteMany({});
        console.log("ket thuc")
        // mongoose.disconnect();
    });

    describe("POST /", () => {
        it("should return customer when the all request body is valid", async () => {
            const res = await request(app)
                .post("/api/customers")
                .send({
                    fullName: "Nguyen Van Minh",
                    phone: "0090847114",
                    email: "minhnv@gmail.com",
                    address: "quan 1",
                    city: "HCM",
                    country: "VN",

                });
            const data = res.body;
            console.log(data.data)
            expect(res.status).to.equal(201);
            expect(data.data).to.have.property("_id");
            expect(data.data).to.have.property("fullName", "Nguyen Van Minh");
            expect(data.data).to.have.property("email", "minhnv@gmail.com");
            expect(data.data).to.have.property("phone", "0090847114");

            const customer = await customerModel.findOne({ email: "minhnv@gmail.com" });
            expect(customer.fullName).to.equal('Nguyen Van Minh');
            expect(customer.phone).to.equal("0090847114");

        });
    });

    describe("GET /", () => {
        it("should return all customer", async () => {
            const products = [
                {
                    fullName: "Nguyen Van Bao",
                    phone: "0090847111",
                    email: "baonv@gmail.com",
                    address: "quan 1",
                    city: "HCM",
                    country: "VN",

                },
                {
                    fullName: "Nguyen Van Nam",
                    phone: "00908471143",
                    email: "namnv@gmail.com",
                    address: "quan 1",
                    city: "HCM",
                    country: "VN",

                }
            ];
            await customerModel.insertMany(products);
            const res = await request(app).get("/api/customers");
            console.log(res.body)
            expect(res.status).to.equal(200);
            expect(res.body.data.length).to.equal(3);
        });
    });

    describe("GET/:id", () => {
        it("should return a customer if valid id is passed", async () => {

            const customer = new customerModel({
                _id: new mongoose.Types.ObjectId(),
                fullName: "Nguyen Van Thinh",
                phone: "00908471146",
                email: "thinhnv@gmail.com",
                address: "quan 1",
                city: "HCM",
                country: "VN",


            });
            await customer.save();
            const res = await request(app).get("/api/customers/" + customer._id);
            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.property("fullName", "Nguyen Van Thinh");
        });

        it("should return 400 error when invalid object id is passed", async () => {
            const res = await request(app).get("/api/customers/1");
            expect(res.status).to.equal(400);
        });

        it("should return 404 error when valid object id is passed but does not exist", async () => {
            const res = await request(app).get("/api/customers/5f43ef20c1d4a133e4628181");
            expect(res.status).to.equal(404);
        });
    });

    describe("PUT /:id", () => {
        it("should update the existing customer and return 200", async () => {
            const customer = new customerModel({
                _id: new mongoose.Types.ObjectId(),
                fullName: "Nguyen Van Phu",
                phone: "00908471146",
                email: "phunv@gmail.com",
                address: "quan 1",
                city: "HCM",
                country: "VN",
            });
            await customer.save();

            const res = await request(app)
                .put("/api/customers/" + customer._id)
                .send({
                    fullName: "Nguyen Van Phu",
                    phone: "009084711111",
                    email: "phunv11@gmail.com",
                    address: "quan 5",
                    city: "HCM",
                    country: "VN",
                });


            expect(res.status).to.equal(200);
            const customerUpdated = await customerModel.findOne({ _id: customer._id });
            console.log(customerUpdated)
            expect(customerUpdated).to.have.property("email", "phunv11@gmail.com");
            expect(customerUpdated).to.have.property("address", "quan 5");
        });
    });

    describe("DELETE /:id", () => {
        it("should delete requested id and return response 200", async () => {

            const customer = new customerModel({
                _id: new mongoose.Types.ObjectId(),
                fullName: "Nguyen Thi Lan",
                phone: "009084711131",
                email: "lannt@gmail.com",
                address: "quan 5",
                city: "HCM",
                country: "VN",
            });
            await customer.save();
            customerId = customer._id;
            const res = await request(app).delete("/api/customers/" + customerId);
            expect(res.status).to.be.equal(200);
        });

        it("should return 404 when deleted course is requested", async () => {
            let res = await request(app).get("/api/customers/" + customerId);
            expect(res.status).to.be.equal(404);
        });
    });


})