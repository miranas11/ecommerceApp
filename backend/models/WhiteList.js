import { Schema, model } from "mongoose";

const WhitelistSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "Product" },
        },
    ],
});

export default model("Whitelist", WhitelistSchema);
