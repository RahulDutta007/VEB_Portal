import { IObjectId } from "../objectId.interface";
export interface IOTPSchema {
  email: string;
  otp: number;
  createdAt: Date
}

export interface IOTP extends IOTPSchema, IObjectId { }
