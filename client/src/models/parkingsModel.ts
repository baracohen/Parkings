export  interface ParkingModel{
    parkingId: number,
    isSelected: boolean,
    isAvailable: boolean,
    userId?: string,
    date: string
}

export  interface ParkingsObj{
    date: any,
    parkings: ParkingModel[]
}