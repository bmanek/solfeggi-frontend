import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});


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
    maxWidth: '75%',
    margin: 'auto',
    marginTop: '5%'
  },
  button: {
    padding: '.5em'
  }
}));

export default function ButtonList(props) {

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = event => {
    setSpacing(Number(event.target.value));
  };


  const [state, setState] = React.useState({
    checked: true,
  });

  const changeSwitch = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };


  return (

        <Paper className={classes.control}>

        <IOSSwitch
          checked={state.checked}
          onChange={changeSwitch('checked')}
          value="checked"
        />

          <Grid container>
            <Grid item>
              <RadioGroup
                name="spacing"
                aria-label="spacing"
                value={spacing.toString()}
                onChange={handleChange}
                row
              >
                {props.allTones.map(value => (
                  <FormControlLabel
                    className={classes.button}
                    key={!!state.checked ? value.freq : value.tone}
                    value={!!state.checked ? value.freq.toString() : value.tone.toString()}
                    control={<Radio color={'primary'} />}
                    label={!!state.checked ? value.freq.toString() : value.tone.toString()}
                    labelPlacement={'bottom'}
                    onClick={(event) => props.createTone(event)}
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
        </Paper>

  );
}
