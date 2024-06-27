import { models } from "../database/database";

async function initializeRoles() {

    const roles = [
        { rol: 'Freelancer' },
        { rol: 'Cliente' }
    ]
    for (const value of roles) {
        await models.Roles.findOrCreate({
            where: { rol: value.rol },
            defaults: {
                rol: value.rol
            }
        })
    }
}
export default initializeRoles