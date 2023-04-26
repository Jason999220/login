export interface IUser {
  googleId?: string;
  facebookId?: string;
  githubId?: string;
  lineId?: string;
  username: string;
}

export interface IMongoDBUser {
  googleId?: string;
  facebookId?: string;
  githubId?: string;
  lineId?: string;
  username: string;
  __v: number;
  _id: string;
}
