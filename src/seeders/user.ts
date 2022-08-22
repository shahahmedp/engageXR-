/**
 * Seeding data with Sequelize Just like how we use Git
 *  to version control source code,
 * we use migrations and seeders to manage the state of our database schemas.
 *
 */

import { v4 as uuidv4 } from 'uuid'
export const user = [
  {
    id: uuidv4(),
    userName: 'shahbaaz',
    email: 'shahbaazcd@gmail.com',
    password: 'abc',
  },
  {
    id: uuidv4(),
    userName: 'umair',
    email: 'ummu@gmail.com',
    password: 'abc',
  },
]
