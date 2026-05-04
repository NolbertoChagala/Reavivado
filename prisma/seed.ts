import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Sembrando datos...');

  const unidades = [
    { nombreGrupo: 'Orión', lider: 'Nolberto Chagala', puntos: 0 },
    { nombreGrupo: 'Eufrates', lider: 'Uri Ovando', puntos: 0 },
    { nombreGrupo: 'Hidekel', lider: 'Mariano Chan', puntos: 0 },
    { nombreGrupo: 'Jovenes', lider: 'Karla Cervantes', puntos: 0 },
  ];

  for (const u of unidades) {
    await prisma.unidad.upsert({
      where: { nombreGrupo: u.nombreGrupo },
      update: {},
      create: u,
    });
    console.log(`✅ Unidad lista: ${u.nombreGrupo}`);
  }

  console.log('👥 Registrando administradores...');
  
  const rawPassNolberto = process.env.ADMIN_PASSWORD_NOLBERTO || 'admin123';
  const rawPassPerla = process.env.ADMIN_PASSWORD_PERLA || 'perla123';

  const passwordNolberto = await bcrypt.hash(rawPassNolberto, 10);
  const passwordPerla = await bcrypt.hash(rawPassPerla, 10);

  await prisma.usuario.upsert({
    where: { email: 'chagala@gmail.com' },
    update: { password: passwordNolberto },
    create: {
      nombre: 'Nolberto Coto',
      email: 'chagala@gmail.com',
      password: passwordNolberto,
      rol: 'ADMIN',
    },
  });


  await prisma.usuario.upsert({
    where: { email: 'perla@gmail.com' },
    update: { password: passwordPerla },
    create: {
      nombre: 'Perla',
      email: 'perla@gmail.com',
      password: passwordPerla,
      rol: 'ADMIN',
    },
  });

  console.log('✅ Usuarios y contraseñas listos para el login.');
}

main()
  .catch((e) => { 
    console.error(e); 
    process.exit(1); 
  })
  .finally(async () => { 
    await prisma.$disconnect();
    await pool.end(); 
  });