"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prueba_1 = require("../controllers/prueba");
const router = (0, express_1.Router)();
router.post('/prueba', prueba_1.postPagos);
exports.default = router;
