import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Track, TrackDocument} from "./schemas/track.schema";
import {Comment, CommentDocument} from "./schemas/comment.schema";
import {CreateTrackDto} from "./dto/create-track.dto";
import {CreateCommentDto} from "./dto/create-comment.dto";


@Injectable()
export class TrackService {

    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>) {}

    async create(dto: CreateTrackDto): Promise<Track> {
        const track = await this.trackModel.create({...dto, listen: 0})
        return track;
    }

    async getAll(): Promise<Track[]>  {
        const tracks = await this.trackModel.find();
        return tracks;
    }

    async getOne(id: ObjectId): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments');
        return track;
    }

    async deleteById(id: ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        // const track = await this.trackModel.deleteOne({_id: id});
        return track.id;
    }

    // async addComment(trackId: ObjectId, text: string): Promise<Track> {
    //     const track = await this.trackModel.findById(trackId);
    //     const comment = await this.CommentModel.create({trackId: trackId, text: text})
    //     return track
    // }

    async addComment(dto: CreateCommentDto): Promise<Comment> {
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.CommentModel.create(dto);
        track.comments.push(comment.id);
        await track.save();
        return comment;
    }
}