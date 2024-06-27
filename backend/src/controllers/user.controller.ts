import { hash } from "bcrypt";
import { Request, Response } from "express";
import { models } from "../database/database";
import {
  validateFieldBody,
  validateFields,
  validateRequeridFields,
} from "../utils/validationUser";

interface UserQueryParams {
  role_id?: string;
  email?: string;
}

export async function createUser(req: Request, res: Response) {
  try {
    const body = req.body;

    // Validación de campos contra el modelo
    const validateBodyInModel = validateFields(body);
    if (validateBodyInModel !== true) return res.status(400).json(validateBodyInModel);

    // Validación de campos requeridos
    const validateRequeridBody = validateRequeridFields(body);
    if (validateRequeridBody !== true) return res.status(400).json(validateRequeridBody);

    // Validación de valores de campos
    const bodyValidate = validateFieldBody(body);
    const bodyValidateKeys = Object.keys(bodyValidate);
    const validate: boolean = bodyValidateKeys.every((key: string) => bodyValidate[key] === body[key]);
    if (!validate) return res.status(400).json({ message: bodyValidate });

    // Validación de email duplicado
    const validateEmail = await models.User.findOne({ where: { email: body.email } });
    console.log(validateEmail, body.email)
    if (validateEmail !== null) {
      return res
        .status(400)
        .json({ message: "El email ya se encuentra registrado. " });
    }

    // Verificar que el role_id existe
    const validateRole = await models.Roles.findOne({ where: { id: body.role_id } });
    if (!validateRole) {
      return res.status(400).json({ message: "El role no existe." });
    }

    // Encriptación de contraseña
    const hashedPassword = await hash(body.password, 10);
    body.password = hashedPassword;

    // Generación de UUID para el usuario
    body.uuid = crypto.randomUUID();

    // Creación del nuevo usuario
    const newUser = await models.User.create({
      ...body,
      include: [{ model: models.Roles, as: 'roles' }]
    });
    return res.status(201).json({
      message: "El usuario ha sido creado con éxito.",
      data: newUser,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Crear Usuario tiene un error interno del Servidor" });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const { role_id, email } = req.query as UserQueryParams;

    if (!role_id && !email) {
      const findUsers = await models.User.findAll();
      return res.status(200).json({
        message: "Lista de usuarios realizada con éxito.",
        data: findUsers,
      });
    }

    const whereClause: { [key: string]: any } = {};

    if (role_id) {
      whereClause.role_id = role_id;
    }

    if (email) {
      whereClause.email = email;
    }

    const users = await models.User.findAll({
      where: whereClause,
    });

    if (users.length === 0) {
      return res.status(404).json({
        message: "No se encontraron usuarios con los criterios especificados.",
      });
    }

    return res.status(200).json({
      message: "Usuarios encontrados con éxito.",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Listado de los usuarios tiene un error interno del Servidor",
    });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "El id es requerido." });
    const findUserById = await models.User.findByPk(id);
    if (findUserById == null) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    return res.status(200).json({
      message: "El usuario ha sido encontrado con éxito.",
      data: findUserById,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "La búsqueda de usuario por id tiene un error interno del Servidor.",
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "El id es requerido." });
    const body = req.body;
    const validateField = validateFields(body);
    if (validateField !== true) return res.status(400).json(validateField);
    const bodyValidate = validateFieldBody(body);
    const bodyValidateKeys = Object.keys(bodyValidate);
    const validate: boolean = bodyValidateKeys.every(
      (key: string) => bodyValidate[key] === body[key]
    );
    if (!validate) return res.status(400).json({ message: bodyValidate });
    const [updated] = await models.User.update(body, {
      where: { uuid: id },
    });
    if (updated) {
      const updatedUser = await models.User.findByPk(id);
      if (updatedUser == null) {
        return res
          .status(404)
          .json({ message: "Usuario no se pudo actualizar." });
      }
      return res.status(200).json({
        message: "El usuario ha sido actualizado con éxito.",
        data: updatedUser,
      });
    }
    return res.status(400).json({ message: "Usuario no encontrado." });
  } catch (error) {
    return res.status(500).json({
      message:
        "La actualización del usuario tiene un error interno del Servidor.",
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "El id es requerido." });
    const deletedUser = await models.User.destroy({ where: { uuid: id } });
    if (deletedUser === 1) {
      return res
        .status(200)
        .json({ message: "El usuario ha sido eliminado con éxito." });
    }
    return res
      .status(404)
      .json({ message: "El usuario no ha sido encontrado." });
  } catch (error) {
    return res.status(500).json({
      message:
        "La eliminación del usuario tiene un error interno del Servidor.",
    });
  }
}
