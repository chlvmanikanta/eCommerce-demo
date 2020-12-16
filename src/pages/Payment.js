import Header from '../components/Header';
import React, { useState } from 'react';

import { Container } from '@material-ui/core';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import MuiAlert from '@material-ui/lab/Alert';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  header: {
    padding: '10px'
  },
});

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

function Payment() {
  const classes = useStyles();
  let [isPaid, setPaid] = useState(false);
  const validations = {
    number: "^[0-9]{12}$", cvv: "^[0-9]{3}$", expiry: "^[0-9]{2}[/][0-9]{2}$", name: "^[a-zA-Z ]*$"
  }
  const validationMsgs = {
    number: "Enter 12 digit card number",
    cvv: "Enter 3 digit card number",
    expiry: "Enter expiry as MM/YY format", name: "Name allows only character & spaces"
  }
  let [errors, setErrors] = useState({ number: "", cvv: "", expiry: "", name: "" })
  const [values, setValues] = React.useState({ number: "", cvv: "", expiry: "", name: "" });

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setPaid(true);
  };

  const handleChange = (val, control) => {
    if (val == "") {
      setErrors({ ...errors, [control]: "Required" });
    } else if (!new RegExp(validations[control]).test(val)) {
      setErrors({ ...errors, [control]: validationMsgs[control] });
    } else {
      setErrors({ ...errors, [control]: "" });
    }
    setValues({ ...values, [control]: val });
  };
  const proceedPayment = () => {
    if(Object.values(values).every(err=> err =="") || Object.values(errors).some(err=> err !="")) return false; // Considered all as mandatory fields
    setOpen(true);
  }

  return (
    <div className="App">
      <Header title="Payments" />
      <Container className={classes.container} maxWidth="sm">
      {!isPaid?
        (<Card className={classes.cardLayout}>
          <CardContent>
            <Grid container spacing={3}>
              <Typography className={classes.header} variant="h6" component="h6">Enter Credit/Debit Card details</Typography>
              <Grid item xs={12}>
                <FormControl error={errors.number !== ""} fullWidth={true} required={true}>
                  <InputLabel htmlFor="number-error">Card Number</InputLabel>
                  <Input
                    id="number-error"
                    value={values.number}
                    onChange={(e) => { handleChange(e.target.value, 'number') }}
                    aria-describedby="number-error-txt"
                  />
                  {errors.number ? <FormHelperText id="number-error-txt">{errors.number}</FormHelperText> : ""}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl error={errors.expiry !== ""} fullWidth={true} required={true}>
                  <InputLabel htmlFor="expiry-error">Expiry</InputLabel>
                  <Input
                    id="expiry-error"
                    value={values.expiry}
                    onChange={(e) => { handleChange(e.target.value, 'expiry') }}
                    aria-describedby="expiry-error-txt"
                  />
                  {errors.expiry ? <FormHelperText id="expiry-error-txt">{errors.expiry}</FormHelperText> : ""}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl error={errors.cvv !== ""} fullWidth={true} required={true}>
                  <InputLabel htmlFor="cvv-error">CVV</InputLabel>
                  <Input
                    id="cvv-error"
                    value={values.cvv}
                    onChange={(e) => { handleChange(e.target.value, 'cvv') }}
                    aria-describedby="cvv-error-txt"
                  />
                  {errors.cvv ? <FormHelperText id="cvv-error-txt">{errors.cvv}</FormHelperText> : ""}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl error={errors.name !== ""} fullWidth={true} required={true}>
                  <InputLabel htmlFor="name-error">Name</InputLabel>
                  <Input
                    id="name-error"
                    value={values.name}
                    onChange={(e) => { handleChange(e.target.value, 'name') }}
                    aria-describedby="name-error-txt"
                  />
                  {errors.name ? <FormHelperText id="name-error-txt">{errors.name}</FormHelperText> : ""}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth={true} variant="contained" color="primary" onClick={()=>proceedPayment()}>Proceed</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>):
        (<TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">Name</TableCell>
                <TableCell align="right">{values.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Number</TableCell>
                <TableCell align="right">{values.number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">Expiry Date</TableCell>
                <TableCell align="right">{values.expiry}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">CVV</TableCell>
                <TableCell align="right">{values.cvv}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>)
      }
      </Container>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>Alert</DialogTitle>
        <DialogContent dividers>
          <Alert variant="filled" severity="success">Payment completed successfully</Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Payment;