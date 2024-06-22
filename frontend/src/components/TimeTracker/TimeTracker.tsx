import { Divider, Stack, Button, Box, Chip } from "@mui/material"
import Tracker from "./Tracker"
import { MonetizationOn, AccessTime } from "@mui/icons-material"

import GroupTask from "./GroupTask"
import { useState } from "react"
import type { Project } from 'types/TimeTracker'



const TimeTracker = () => {
  const [options, setOptions] = useState<Project[]>([]);
  const [value, setValue] = useState<Project | null>(null);
  console.log(value)
  
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


          <MonetizationOn />
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

      >
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
        </Stack>
      </Box>



    </>
  )
}
export default TimeTracker