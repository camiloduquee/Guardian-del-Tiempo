import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthUser } from '../../context/auth-context';
// import { projectsRequest } from '../../api/auth';
import axios from 'axios';

const URL_BASE = import.meta.env.VITE_BD_URL

interface Project {
    name: string;
    price_hour: string
}




export default function Tracker() {
    const { cookies } = useAuthUser()
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<readonly Project[]>([]);
    const loading = open && options.length === 0;
    const optionsCors = {
        method: 'GET',
        url: `${URL_BASE}/project`,
        headers: {
            cookie: `token=${cookies.token}`
        },
        withCredentials: true,

    }


    useEffect(() => {
        let active = true;
      
        if (!loading || options.length > 0) {
            return undefined;
        }

        (async () => {
            // const { data } = await projectsRequest()
            

            const { data } = await axios.request(optionsCors)

            if (active) {
                setOptions([...data]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, options]);


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Autocomplete
            id="asynchronous-demo"

            sx={{ width: 300, background: 'white' }}
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Selecciona Proyecto"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}


