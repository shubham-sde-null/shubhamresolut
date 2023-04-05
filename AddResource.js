import mongoose from "mongoose";
const resourceSchema = mongoose.Schema({
  name: String,
  email: String,
  designation: String,
  password: String,
});
export default mongoose.model("Resource", resourceSchema);
