import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { projectsRequest } from '../../api/auth';
import type { Project, TrackerProps } from 'types/TimeTracker'



const Tracker: React.FC<TrackerProps> = ({ options, setOptions, setValue }) => {

    const [open, setOpen] = useState(false);
    const loading = open && options.length === 0;


    useEffect(() => {
        let active = true;

        if (!loading || options.length > 0) {
            return undefined;
        }

        (async () => {

            const { data } = await projectsRequest()

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
            id="select-project"
            sx={{ width: 300, background: 'white' }}
            open={open}
            loadingText='Cargando'
            onOpen={handleOpen}
            onClose={handleClose}
            isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
            getOptionLabel={(option) => option.name}
            onChange={(_event, newValue: Project | null) => {
                setValue(newValue)
            }}

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
export default Tracker
