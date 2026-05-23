import { Types } from "mongoose";
import { IItinerary } from "../../domain/entities/IItinerary";
import { ICreateItinerary, IItineraryRepository, PaginationResult } from "../../domain/repositories/IItineraryRepository";
import ItineraryModel from "../models/Itinerary";


export class ItineraryRepository implements IItineraryRepository {
    async create(data: ICreateItinerary): Promise<IItinerary> {

        const itinerary = await ItineraryModel.create({
            userId: data.userId,
            ...data.itinerary,
        });
        console.log(itinerary, 'itinerary in mogo');

        return itinerary;
    }

    async findByUserId(
        userId: string,
        page: number,
        limit: number
    ): Promise<
        PaginationResult<IItinerary>
    > {
        const skip =
            (page - 1) * limit;

        const [
            itineraries,
            total,
        ] = await Promise.all([
            ItineraryModel.find({ userId: new Types.ObjectId(userId) })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),

            ItineraryModel.countDocuments(
                { userId: new Types.ObjectId(userId) }
            ),
        ]);

        return {
            items: itineraries as IItinerary[],
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findById(
        itineraryId: string
    ): Promise<IItinerary | null> {
        const itinerary =
            await ItineraryModel
                .findById(
                    itineraryId
                )
                .lean<IItinerary>();

        return itinerary;
    }
   
async togglePublicStatus(
  itineraryId: string,
  userId: string
): Promise<IItinerary | null> {
  const itinerary =
    await ItineraryModel.findOne({
      _id:
        itineraryId,
      userId,
    });

  if (!itinerary)
    return null;

  itinerary.isPublic =
    !itinerary.isPublic;

  await itinerary.save();

  return itinerary.toObject();
}
    async findByShareId(
        shareId: string
    ): Promise<IItinerary | null> {
        return await ItineraryModel.findOne({ shareId, isPublic: true, })
            .lean<IItinerary>();
    }
}