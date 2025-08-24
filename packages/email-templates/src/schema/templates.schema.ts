import { z } from 'zod';

const baseEmailSchema = z.object({
  id: z.string().min(1,"L'id du template à utiliser est requis"),
  to: z.string().email("L'adresse email destinataire doit être valide").optional(),
  from: z.string().email("L'adresse email expéditeur doit être valide").optional(),
});

// Schéma pour les emails de test
export const testEmailSchema = baseEmailSchema.extend({
  data: z.object({
    productName: z.string().min(1, "Le nom du produit est requis"),
    userName: z.string().min(1, "Le nom d'utilisateur est requis")
  }),
});

// Schéma pour les emails de contact
export const contactEmailSchema = baseEmailSchema.extend({
  data: z.object({
    email: z.string().email("L'adresse email doit être valide"),
  }),
});


// Schéma d'union qui regroupe tous les types d'emails
export const templatesEmailSchema = z.union([
  testEmailSchema,
  contactEmailSchema
]);
