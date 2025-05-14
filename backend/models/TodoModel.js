const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
