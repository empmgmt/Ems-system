    import mongoose from "mongoose";
    import { Schema } from "mongoose";

    const notificationSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
    });

    const Notification = mongoose.model('Notification', notificationSchema);
    export default Notification;
