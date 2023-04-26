"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
// get root
app.get("/", function (req, res) {
    res.send("Welcome to server side");
});
// listen
app.listen(8000, function () {
    console.log("Server listening on port 8000");
});
//# sourceMappingURL=index.js.map