import {Body, Controller, Get, Param, Post, Put} from "@nestjs/common";
import {NotificationService} from "./notification.service";
import {Note} from "../../models/notification/notification.schema";


@Controller('/note')
export class NotificationController {
    constructor(private notService: NotificationService) {
    }


    @Post()
    createNotification(@Body() note: Note) {
        return this.notService.createNote(note);
    }

    @Get("/:customerId")
    getAllNotes(@Param('customerId') customerId: string) {
        return this.notService.getAllNotes(customerId);
    }

    @Put('/:customerId')
    setVisibleNotes(@Param('customerId') customerId: string) {
        return this.notService.setVisibleNotes(customerId);
    }
}