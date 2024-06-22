import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { createUser } from "./user.controller";
import { User } from "../models/users.model";


import {
  validateFieldBody,
  validateFields,
  validateRequeridFieldsCustom,
} from "../utils/validationUser";
import { Expire, Secret } from "../utils/config";

export async function login(req: Request, res: Response) {
  try {
    const body = req.body;
    const validateBodyInModel = validateFields(body);
    if (validateBodyInModel !== true)
      return res.status(400).json(validateBodyInModel);
    const validateRequeridBody = validateRequeridFieldsCustom(body);
    if (validateRequeridBody !== true)
      return res.status(400).json(validateRequeridBody);
    const bodyValidate = validateFieldBody(body);
    const bodyValidateKeys = Object.keys(bodyValidate);
    const validate: boolean = bodyValidateKeys.every(
      (key: string) => bodyValidate[key] === body[key]
    );
    if (!validate) return res.status(400).json({ message: bodyValidate });
    // valida credenciales
    const userLog: any = await User.findOne({
      where: { email: body.email },
    });
    if (!userLog) {
      return res
        .status(401)
        .json({ message: "El email no esta asociado a ningún usuario." });
    }
    const passwordEncrypt = userLog.password;
    const passwordMatch = await compare(body.password, passwordEncrypt);
    if (!passwordMatch) {
      return res.status(401).json({ message: "La contraseña es incorrecta." });
    }
    // Generando token.
    const token = sign({ id: userLog.uuid }, `${Secret}`, {
      expiresIn: Expire,
    });
    // -------Optiones de las cookies en producción ON 
    // httpOnly: Para que en el frontend no se pueda manipular por medio javascript
    // secure: Para que solo se mande las cookies por conexión https
    // sameSite: para que la cookies se envie entre dominios
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' });
    // responde
    return res
      .status(200)
      .json({ message: "El inicio de sesión ha sido exitoso.", token });

  } catch (error) {
    return res.status(500).json({
      message: "El inicio de sesión tiene un error interno del Servidor,",
    });
  }
}


export async function register(req: Request, res: Response) {
  try {
    await createUser(req, res);
  } catch (error) {
    return res.status(500).json({
      message: "El registro de usuario tiene un error interno del Servidor.",
    });
  }
}
