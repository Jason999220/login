export interface IMongoDBUser {
  googleId?: string;
  facebookId?: string;
  githubId?: string;
  lineId?: string;
  username: string;
  thumbnail: string;
  date: Date;
  email?: string;
  __v: number;
  _id: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  date: Date;
  __v: number;
  _id: string;
}
export interface LoginUser {
  email: string;
  password: string;
  date: Date;
  __v: number;
  _id: string;
}
