import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './bootstrap.min.css';
import SendIcon from '@material-ui/icons/Send';


function Submit() {
    return (
        <div className="container">
            <div className="row m-1">
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle/>
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Write here your name" inputProps={{maxLength: 25}}/>
                    </Grid>
                </Grid>
                <TextField
                    id="outlined-multiline-static"
                    label="Write here some epic shit    "
                    inputProps={{maxLength: 130}}
                    fullWidth
                    multiline
                    rows="4"
                    defaultValue=""
                    margin="normal"
                    variant="outlined"
                    className="mt-4"
                />
                <div className="d-flex justify-content-end w-100 mt-2">
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon/>}>
                        Send to the TV
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Submit;