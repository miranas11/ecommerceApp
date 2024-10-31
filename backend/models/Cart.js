import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1, min: 1 },
        },
    ],
});
export default model("Cart", CartSchema);
