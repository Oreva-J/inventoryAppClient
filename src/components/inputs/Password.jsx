import React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

const Password = ({ text, name, onChange, value }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{ width: '100%' }} variant="outlined">
            <InputLabel htmlFor={`outlined-adornment-${name}`}>{text}</InputLabel>
            <OutlinedInput
                id={`outlined-adornment-${name}`}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                name={name}
                label={text}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default Password;
