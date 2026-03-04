import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb(env: { sibin_helpdesk_db: D1Database }) {
    return drizzle(env.sibin_helpdesk_db, { schema });
}
