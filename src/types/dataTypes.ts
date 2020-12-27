export interface ContextData {
    updated:string,
    dataPoints: DataPoint[]
}

export interface DataPoint {
    humidity: number
    id: string
    name: string
    temperature: number
    updated: string
    voltage: number
}