import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
    maxWidth: '25em',
    margin: 'auto',
    marginTop: '5%',
  },
  button: {
    margin: '1em',
    backgroundColor: 'primary'
  }
}));

export default function ButtonList(props) {

  const classes = useStyles();

  const [type, setType] = React.useState('Freq');

  const handleChange = (event, newType) => {
    debugger
    setType(newType);
  };

  const children = [

    <ToggleButton key={1} value="Freq" disabled={type === 'Freq' ? true : false}>
      <EqualizerIcon color="secondary"/>
    </ToggleButton>,

    <ToggleButton key={2} value="Tone" disabled={type === 'Tone' ? true : false}>
      <MusicNoteIcon color="secondary"/>
    </ToggleButton>,
  ];

  return (

    <div>

        <Paper className={classes.control}>

          <ToggleButtonGroup size="small" value={type} exclusive onChange={handleChange}>
            {children}
          </ToggleButtonGroup>

            <Grid container>
              <Grid item>

                  {props.allTones.map(value => (
                    <Button
                      className={classes.button}
                      key={type === 'Freq' ? value.freq : value.tone}
                      value={value.freq.toString()}
                      onClick={(event) => props.createTone(event)}
                      size={'small'}
                      variant="contained"
                      color="primary"
                    >

                      {type === 'Freq' ? value.freq : value.tone}

                    </Button>
                  ))}

              </Grid>
            </Grid>
        </Paper>

      </div>

  );
}
