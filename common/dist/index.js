"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBloginput = exports.createBloginput = exports.SigninInput = exports.SignupInput = void 0;
const Zod_1 = __importStar(require("Zod"));
// signup Zod validation 
exports.SignupInput = Zod_1.default.object({
    username: Zod_1.default.string().email(),
    password: Zod_1.default.string().min(6),
    name: (0, Zod_1.string)().optional()
});
// Signin ZOD validation
exports.SigninInput = Zod_1.default.object({
    username: Zod_1.default.string().email(),
    password: Zod_1.default.string().min(6)
});
// createBlog ZOD validation
exports.createBloginput = Zod_1.default.object({
    title: Zod_1.default.string(),
    content: Zod_1.default.string()
});
// updateBlog ZOD validation
exports.updateBloginput = Zod_1.default.object({
    title: Zod_1.default.string(),
    content: Zod_1.default.string(),
    id: (0, Zod_1.number)()
});
