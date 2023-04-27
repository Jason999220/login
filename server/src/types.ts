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
