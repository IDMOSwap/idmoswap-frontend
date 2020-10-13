import React, { useContext } from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import './index.scss';
import { useTranslation } from 'react-i18next';
const styles = (theme: Theme) =>
  createStyles({
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

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
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

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Loading({ handleClose, form }: { handleClose: any, form: string }) {
  const { t, i18n } = useTranslation();
  return <div style={{ minWidth: "254px" }} className="loadingModal">
    <div className="loadingtitle">
      <IconButton aria-label="close" onClick={handleClose} className="colse">
        <CloseIcon />
      </IconButton>
    </div>
    <div className="loadingContent">
      <div className="shadow">
        <div className="loader">
          <div className="mask"></div>
        </div>
      </div>
    </div>
    <div className="loadingtxt">
      <h3>{t('WaitingForConfirmation')}</h3>
      <h4>{t('SwappingFor', { tokenName: form })}</h4>
      <p>{t('Confirmwallet')}</p>
    </div>
  </div>
}

function Error({ handleClose }: { handleClose: any }) {
  const { t } = useTranslation();
  return <div style={{ minWidth: "254px" }} className="loadingModal">
    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
      {t('Error')}
    </DialogTitle>
    <div className="errorContent">
      <WarningIcon color="secondary" fontSize="large" />
      <h3>{t('Transactionrejected')}</h3>
    </div>
    <DialogActions>
      <Button autoFocus onClick={handleClose} variant="contained" color="secondary">
        {t('Dismiss')}
      </Button>
    </DialogActions>
  </div>
}

function Success({ handleClose, address }: { handleClose: any, address: string }) {
  const { t, i18n } = useTranslation();
  return <div style={{ minWidth: "254px" }} className="loadingModal">
    <div className="loadingtitle">
      <IconButton aria-label="close" onClick={handleClose} className="colse">
        <CloseIcon />
      </IconButton>
    </div>
    <div className="loadingContent">
      <CheckCircleOutlineOutlinedIcon color="secondary" fontSize="large" />
    </div>
    <div className="successtext">
      <h3>{t('TransactionSubmitted')}</h3>
      <a href={i18n.language === "en" ? `https://etherscan.io/tx/${address}` : `https://cn.etherscan.com/tx/${address}`}>
        {t('ViewonEtherscan')}
      </a>
    </div>
    <DialogActions>
      <Button autoFocus onClick={handleClose} variant="contained" color="secondary">
        {t('Close')}
      </Button>
    </DialogActions>
  </div>
}

export default function CustomizedDialogs({ type, open, close, address, form }: { type: string, open: boolean, address: string, form: string, close: Function }) {

  const handleClose = () => {
    close()
  };

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        {type === "loading" && <Loading handleClose={handleClose} form={form} />}
        {type === "error" && <Error handleClose={handleClose} />}
        {type === "success" && <Success handleClose={handleClose} address={address} />}
      </Dialog>
    </div>
  );
}
