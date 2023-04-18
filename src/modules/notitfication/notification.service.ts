import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Note, NoteDocument} from "../../models/notification/notification.schema";
import {Customer, CustomerDocument} from "../../models/customer/customer.schema";


@Injectable()
export class NotificationService {
    constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>,
                @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>) {
    }

    async createNote(note: Note): Promise<Note> {
        note = {...note, isReadable: false}
        await this.customerModel.updateMany({role: "Customer"}, {$push: {notes: note}})

        const notification = await this.noteModel.create(note)
        return notification
    }

    async getAllNotes(customerId: string): Promise<Note[]> {
        const customer = await this.customerModel.findOne({customerId: customerId});
        return customer?.notes;
    }

    async setVisibleNotes(customerId: string): Promise<string> {
        const foundedCustomer = await this.customerModel.findOne({customerId: customerId});
        foundedCustomer.notes.forEach((note: Note) => {
            note.isReadable = true;
        })
        await this.customerModel.findOneAndUpdate({customerId: customerId}, foundedCustomer, {new: true});
        return "Notes was updated";
    }
}