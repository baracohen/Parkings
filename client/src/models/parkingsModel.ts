export  interface ParkingModel{
    parkings: any;
    parkingId: number,
    isAvailable: boolean,
    userId?: string,
    floor: number,
    date: string
}

export  interface ParkingsObj{
    date: any,
    parkings: ParkingModel[]
}

export interface ParkingSpotModel{
    parkingId: number,
    userId: string,
    floor: number,
    date: string
}