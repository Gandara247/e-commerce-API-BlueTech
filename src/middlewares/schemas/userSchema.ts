import { object, string } from "yup";

export const userSchema = {
  login: {
    body: object({
      email: string().email().required(),
      password: string().required(),
    }),
  },
  getUserById: {
    params: object({
      id: string().required(),
    }),
  },
  getUserByEmail: {
    params: object({
      email: string().email().required(),
    }),
  },
  createUser: {
    body: object({
      name: string().required(),
      email: string().email().required(),
      password: string().min(8).required(),
    }),
  },
  updateUser: {
    params: object({
      email: string().email().required(),
    }),
    body: object({
      name: string().optional(),
      password: string().min(8).optional(),
    }),
  },
  deleteUser: {
    params: object({
      email: string().email().required(),
    }),
  },
};