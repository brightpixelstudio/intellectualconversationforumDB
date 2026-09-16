export interface GetAllProfileMembers {
  userid: number;
  username: string;
  email: string;
  name: string;
  zipcode: number;
  usertypeid: number;
  type: string;
  dateadded: Date;
  datelastlogin: Date;
  count: number;
  profile: string;
  blocked: boolean;
}
