export enum UserRole {
  Freelance = 1,
  Cliente = 2
}

export interface FormRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role_id: UserRole;
  birthdate: string;
  phone: string;
}
export type FormLogin = {
  email: string,
  password: string,
}
export type FRWithoutConfirm = Omit<FormRegister, 'confirmPassword'>;

export interface useRequestType {
  signUp: (data: FRWithoutConfirm) => Promise<void>;
  login: (data: FormLogin) => Promise<void>;
}


export interface User {
  id: string;
  username: string;
  email: string;

}
export interface AuthContextType {
  user: User | null;
  cookies: any;
  // login: (data: FormLogin) => Promise<void>;
  // signUp: (data: FRWithoutConfirm) => Promise<void>;
  logout: Function;
  isAuthenticated: any;
  setCookie: Function
}

export interface stateSideBarProps {
  open: boolean ,
  handleChangeOfStatus: () => void

}

// ---------> ProjectsTypes --------

export interface ICreateProject {
  name: string;
  description: string;
  email_client: string;
  price_hour: number;
}

export interface IShowProject {
  name: string,
  email_client: string,
  init_date: null,
  end_date: null,
  is_completed: boolean,
  price_hour: string
}

export interface IClient {
  avatar: null,
  birthdate: string,
  email: string,
  first_name: string,
  last_name: string,
  phone: string,
  uuid: string,
  role_id: number
}

export interface IProjectResponse {
  uuid?:            string;
  init_date:       null;
  end_date:        null;
  name:            string;
  price_hour:      string;
  description?:     string;
  id_cliente?:      null | string;
  email_client:    string;
  is_completed:    boolean;
  is_active?:       boolean;
  status_uuid?:     string;
  custom_label_id?: null;
  user_uuid?:       string;
}
// ------> Person ------

export interface Person {
  results: Result[];
  info:    Info;
}

export interface Info {
  seed:    string;
  results: number;
  page:    number;
  version: string;
}

export interface Result {
  gender:     Gender;
  name:       Name;
  location:   Location;
  email:      string;
  login:      Login;
  dob:        Dob;
  registered: Dob;
  phone:      string;
  cell:       string;
  id:         ID;
  picture:    Picture;
  nat:        string;
}

export interface Dob {
  date: Date;
  age:  number;
}

export enum Gender {
  Female = "female",
  Male = "male",
}

export interface ID {
  name:  string;
  value: null | string;
}

export interface Location {
  street:      Street;
  city:        string;
  state:       string;
  country:     string;
  postcode:    number | string;
  coordinates: Coordinates;
  timezone:    Timezone;
}

export interface Coordinates {
  latitude:  string;
  longitude: string;
}

export interface Street {
  number: number;
  name:   string;
}

export interface Timezone {
  offset:      string;
  description: string;
}

export interface Login {
  uuid:     string;
  username: string;
  password: string;
  salt:     string;
  md5:      string;
  sha1:     string;
  sha256:   string;
}

export interface Name {
  title: string;
  first: string;
  last:  string;
}

export interface Picture {
  large:     string;
  medium:    string;
  thumbnail: string;
}

// --------- others --------

export interface StatusType {
  uuid: string
  color: string
  name: string
}

export interface LabelType {
  uuid: string
  description: string
  color: string
  name: string
  is_active: boolean
}
