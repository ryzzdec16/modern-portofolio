"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailer_1 = __importDefault(require("./lib/mailer"));
(async () => {
    try {
        await (0, mailer_1.default)("riskymiripacet123@gmail.com", "Tes Gmail SMTP", "Halo bro, ini test email dari Node.js 💌");
    }
    catch (err) {
        console.error("❌ Error kirim email:", err);
    }
})();
