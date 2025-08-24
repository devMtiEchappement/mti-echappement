import { z } from 'zod';

const PathsSchema = z.object({

  app: z.object({
    root: z.string().min(1),
    profileSettings: z.string().min(1),
  }),
});

const pathsConfig = PathsSchema.parse({

  app: {
    root: '/app',
    profileSettings: '/home/settings',
  },
} satisfies z.infer<typeof PathsSchema>);

export default pathsConfig;
