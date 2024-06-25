// backend/src/types/models.ts
import { Model, DataTypes } from 'sequelize';

export interface UserAttributes {
  uuid: string;
  avatar: string | null;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  phone: string | null;
  birthdate: Date | null;
  role_id: number | null;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}

export interface CustomLabelAttributes {
  id: number;
  // Otras propiedades de CustomLabel si las hay
}

export interface CustomLabelInstance extends Model<CustomLabelAttributes>, CustomLabelAttributes {}

// Otras interfaces para modelos adicionales si es necesario
