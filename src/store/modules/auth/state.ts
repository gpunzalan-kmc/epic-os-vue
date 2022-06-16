import { SecurityClaims } from "@/api/response.types";
import JwtService from "@/common/jwt.service";

export interface AuthStateTypes {
  isAuthenticated: boolean;
  token: string;
  user: {
    clientId: string | null;
    company: string | null;
    email: string | null;
    firstName: string | null;
    industry: string | null;
    lastName: string | null;
    personID: number | null;
    phoneNumber: string | null;
    position: string | null;
    profilePicture: string | null;
    tin: string | null;
  };
  mount: boolean;
  claims: Array<SecurityClaims>;
  loading: boolean;
  subName: {
    image: string | null;
    subject: string | null;
    subname: string | null;
  };
}

export const state: AuthStateTypes = {
  token: "",
  claims: [],
  isAuthenticated: !!JwtService.getToken(),
  user: {
    clientId: null,
    company: null,
    email: null,
    firstName: null,
    industry: null,
    lastName: null,
    personID: null,
    phoneNumber: null,
    position: null,
    profilePicture: null,
    tin: null,
  },
  loading: false,
  mount: false,
  subName: {
    image: null,
    subject: null,
    subname: null,
  },
};

export type State = typeof state;
