import {HydratedDocument} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";


export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {

    @Prop()
    subject: string;

    @Prop()
    description: string;

    @Prop()
    isReadable: boolean


}

export const NoteSchema = SchemaFactory.createForClass(Note);