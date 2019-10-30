import React from 'react';

import { purple } from '@material-ui/core/colors';



export default function CustomizedSwitches() {
  const [state, setState] = React.useState({
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <FormGroup>

      <FormControlLabel
        control={
          <IOSSwitch
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            value="checkedB"
          />
        }
        label="Freq/Note"
      />

    </FormGroup>
  );
}
