import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import User from "./User.js";
import AddResource from "./AddResource.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
const DATABASE = process.env.DATABASE;
const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(DATABASE);
app.get("/", (req, res) => {
  res.send("resolut database is active now");
});
//get all the users in the database
app.get("/users", async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.json(users);
});
//get all the resource present in the database
app.get("/allresource", async (req, res) => {
  const allResource = await AddResource.find();
  res.json(allResource);
});
//here I am saving the user in the database in mongodb
app.post("/registeruser", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    console.log("ERROR : " + res.json({ message: err }));
  }
});
//add the resource in the database
app.post("/addresource", async (req, res) => {
  const addedResource = new AddResource({
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    designation: req.body.designation,
    password: req.body.password,
    today: req.body.today,
    billable: req.body.billable,
    nonbillable: req.body.nonbillable,
  });
  try {
    const savedResource = await addedResource.save();
    res.json(savedResource);
  } catch (err) {
    console.log("ERROR : " + res.json({ message: err }));
  }
});
//authenticate the user in the database
app.post("/loginuser", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (user) {
      const token = user._id;
      res.send(token);
      console.log(token);
    } else {
      res.send("Invalid User");
    }
  } catch (err) {
    res.json(err);
  }
});
//delete data from the database
app.delete("/allresource/:id", async (req, res) => {
  await AddResource.deleteOne({ id: req.params.id });
  res.json("record deleted");
  console.log("data removed");
});
//update the record
app.put("/allresource/:id", async (req, res) => {
  await AddResource.updateOne(
    { id: req.params.id },
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        designation: req.body.designation,
      },
    }
  );
  res.json("data is updated");
});
app.listen(PORT, () => {
  console.log(`server is running at PORT no ${PORT}`);
});
