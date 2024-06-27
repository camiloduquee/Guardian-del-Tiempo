import { models } from "../database/database";

async function initializeStatus() {
    
    const statuses = [
        {
            uuid: 'cb01e587-9501-4370-9fd0-d2ab7b3e07d3', 
            name: 'creado',
            color: 'gray'
        },
        {
            uuid: '6d7e052c-d7e3-4a6c-a4a0-69169d923fb5', 
            name: 'pendiente',
            color: 'orange'
        },
        {
            uuid: 'b4f457f2-6eab-429f-9c87-4a9f9e9ccba6',
            name: 'completado',
            color: 'blue'
        }
    ]

    for (const status of statuses) {
        await models.Status.findOrCreate({
            where: { uuid: status.uuid },
            defaults: {
                uuid: status.uuid,
                color: status.color,
                name: status.name
            }
        })
    }
}
export default initializeStatus