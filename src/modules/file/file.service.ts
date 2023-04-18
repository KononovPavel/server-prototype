import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as path from 'path'
import * as fs from "fs";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
    constructor() {
    }


    createFile(file: Express.Multer.File, folderName: string): string {
        try {
            const fileExtension = file.originalname.split('.').pop()
            const fileName = uuidv4() + '.' + fileExtension
            const filePath = path.resolve(__dirname, `../../`,'static', folderName)
            if(!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return folderName + '/' + fileName
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}