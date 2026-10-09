import { z } from "zod";

export const RegistrarPuntajeSchema = z.object({
  unidadId: z.string().trim().min(1, "Identificador de unidad no válido."),
  cantidad: z.coerce
    .number({ message: "La cantidad debe ser un número válido." })
    .int("La cantidad debe ser un número entero.")
    .refine((val) => val >= -10000 && val <= 10000, {
      message: "La cantidad está fuera del rango permitido.",
    }),
  tipoOperacion: z.enum(["fijar", "sumar"], {
    message: "Tipo de operación no válido.",
  }),
});

export const CrearUsuarioSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre debe contener al menos 2 caracteres.")
    .max(80, "El nombre excede el límite permitido."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("El formato del correo electrónico no es válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres.")
    .max(100, "La contraseña supera el tamaño máximo permitido."),
});

export const EliminarUsuarioSchema = z.string().trim().min(1, "Identificador de usuario requerido.");