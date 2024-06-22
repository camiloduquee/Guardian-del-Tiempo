export type Request = Request<
  {},
  any,
  any,
  QueryString.ParsedQs,
  Record<string, any>
>

export type Response = Response<any, Record<string, any>, number>

export interface DatabaseConfig {
  database: string;
  user: string;
  password: string;
  host: string;
  port: string | number;
  dialect: 'postgres'; // Aseguramos que el dialecto sea 'postgres'
  dialectModule: typeof pg; // Aquí deberías importar pg y usar typeof para obtener el tipo
}
