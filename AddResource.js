import mongoose from "mongoose";
const resourceSchema = mongoose.Schema({
  id: String,
  username: String,
  email: String,
  designation: String,
  password: String,
  today: String,
  billable: String,
  nonbillable: String,
});
export default mongoose.model("Resource", resourceSchema);
