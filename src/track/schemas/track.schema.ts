import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import * as mongoose from 'mongoose';
import {Album} from "../../album/album.schema";

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
    @Prop()
    name: string;

    @Prop()
    artist: number;

    @Prop()
    text: string;

    @Prop()
    listens: number;

    @Prop()
    picture: string;

    @Prop()
    audio: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Album'})
    track: Album
}

export const TrackSchema = SchemaFactory.createForClass(Track);