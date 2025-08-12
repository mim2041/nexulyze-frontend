export interface User {
    id: string
    name: string
    email: string
}

export interface BookingFormData {
    startTime: string
    endTime: string
    activity: string
    players: User[]
    isRecurrent: boolean
    courts: string
    cancellationHours: number
    doorCode: string
    totalPrice: number
    discount: number
}

export interface Court {
    id: string
    name: string
    type: 'padel' | 'tennis' | 'squash'
    available: boolean
    hourlyRate: number
}

export interface Activity {
    id: string
    name: string
    duration: number
    maxPlayers: number
    minPlayers: number
}

export interface Booking {
    id: string
    userId: string
    courtId: string
    activityId: string
    startTime: string
    endTime: string
    players: User[]
    totalPrice: number
    discount: number
    status: 'confirmed' | 'pending' | 'cancelled'
    createdAt: string
    updatedAt: string
}