import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CallService} from "./call.service";


@Controller('/call')
export class CallController {
    constructor(private callService: CallService) {
    }


    @Get('/:customerId')
    getCallsByCustomer(@Param('customerId') customerId: string) {
        return this.callService.getCallsByCustomer(customerId);
    }

    @Post()
    createCall(@Body() {from, to, time}: { from: string, to: string, time: number }) {
        return this.callService.createCall(from, to, time);
    }
}