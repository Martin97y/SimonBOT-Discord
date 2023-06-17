import mongoose from 'mongoose'; 
describe("Check DB", () => {
    it("should connect", async () => {
        const connect = await mongoose.connect("mongodb+srv://msOS:UGWW7Mys3Cxih4tF@accountmanager.b2vkp4o.mongodb.net/");
        expect(mongoose.connection.readyState).toBe(1);
        connect.connection.close();
    });
});