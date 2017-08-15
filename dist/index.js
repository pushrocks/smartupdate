"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartupdate.plugins");
class SmartUpdate {
    constructor() {
        this.kvStore = new plugins.npmextra.KeyValueStore('custom', 'global:smartupdate');
    }
    check(npmname) {
    }
}
let standardInstance = new SmartUpdate();
exports.check = standardInstance.check;
exports.standardExport = 'Hi there! :) This is a exported string';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlEQUFnRDtBQUVoRDtJQUFBO1FBQ0UsWUFBTyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUE7SUFJOUUsQ0FBQztJQUhDLEtBQUssQ0FBRSxPQUFlO0lBRXRCLENBQUM7Q0FDRjtBQUNELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQTtBQUU3QixRQUFBLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUE7QUFHOUIsUUFBQSxjQUFjLEdBQUcsd0NBQXdDLENBQUEifQ==