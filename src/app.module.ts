import {Module} from "@nestjs/common";
import {TrackModule} from "./track/track.module";
import {MongooseModule} from "@nestjs/mongoose";
import {FileModule} from "./file/file.module";


@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/music_platform'),
        TrackModule,
        FileModule
    ]
})
export class AppModule {}