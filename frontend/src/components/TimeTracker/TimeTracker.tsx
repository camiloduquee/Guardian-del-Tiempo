import { Divider, Stack, Button, Box, Chip } from "@mui/material"
import Tracker from "./Tracker"
import { MonetizationOn, AccessTime } from "@mui/icons-material"

import GroupTask from "./GroupTask"
import { useEffect, useState } from "react"
import type { Project, Task } from 'types/TimeTracker'
import { tasksProjectIdRequest } from "../../api/auth"


const TimeTracker = () => {
  const [options, setOptions] = useState<Project[]>([])
  const [value, setValue] = useState<Project | null>(null)
  const [task, setTask] = useState<Task[]>([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!value?.uuid) return;
    (async () => {
      try {
        const { data } = await tasksProjectIdRequest(value.uuid)
        setError(null)
        setTask([...data])


      } catch (error: any) {
        setError(error.response.data.message)

      }

    })()
    return () =>{
      setTask([])
    }

  }, [value])

  console.log({Tareas:task})
  return (
    <>
      <section className=" bg-slate-100">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={5}
          padding={2}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Tracker options={options} setOptions={setOptions} setValue={setValue} />
          <Chip label={value?.price_hour ? `${value?.price_hour} /hora` : '-'} icon={<MonetizationOn />} color="primary" />
          <div>
            <p>02:19:00</p>
          </div>
          <Button
            variant="outlined"
            startIcon={<AccessTime />}
            sx={{ backgroundColor: '#eff6ff' }}
          >
            Iniciar
          </Button>
        </Stack>
      </section>
      <Box
        marginTop={10}
        width="100"
        height='100vh'
      >
        {value ?
          error ?
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <span className=" text-center text-2xl text-gray-500">{error}</span>
            </Stack> :


            <Stack
              justifyContent="center"
              alignItems="center"
              direction={{ sm: 'column', md: 'row' }}
              spacing={{ sm: 4, md: 8 }}
            >

              <GroupTask status='ABIERTO' />
              <GroupTask status='EN PROCESO' />
              <GroupTask status='PRUEBA' />
              <GroupTask status='COMPLETADO' />
            </Stack> :

          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <span className=" text-center text-2xl text-gray-500"> Selecciona un proyecto</span>
          </Stack>


        }

      </Box>

    </>
  )
}
export default TimeTracker