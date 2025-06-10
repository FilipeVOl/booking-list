export interface RoomingList {
    roomingListId: number;
    eventId: number;
    eventName: string;
    hotelId: number;
    rfpName: string;
    cutOffDate: string;
    status: string;
    agreement_type: string;
}


// Generic type para filtrar rooming lists por nome do evento
export type FilterRoomingListByEvent<T extends string> = RoomingList & {
    eventName: string; // deve conter T
};

// Generic function para filtrar rooming lists
export function filterRoomingListsByEvent<T extends string>(
    lists: RoomingList[],
    eventName: T
): FilterRoomingListByEvent<T>[] {
    return lists.filter((list) => list.eventName.includes(eventName)) as FilterRoomingListByEvent<T>[];
}