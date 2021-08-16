import React, {useState} from 'react';
import List from '@material-ui/core/List';
import {ListItem, makeStyles, ListItemIcon, ListItemText, Collapse} from '@material-ui/core';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ListsItems = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open);
  };

  return(
    <div>
       <Link to="/inicio">
        <ListItem button>
          <ListItemIcon>
          <DashboardOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
       </Link>

      <Link to="/proyects">
        <ListItem button>
          <ListItemIcon>
            <AccountBalanceWalletOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Proyectos" />
        </ListItem>
      </Link>

      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <ImportExportOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="Corporación" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
               <ImportExportOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Resultados" />
          </ListItem>
        </List>

        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AccountBalanceWalletOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Liquidez" />
          </ListItem>
        </List>

        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
               <ImportExportOutlinedIcon/>
            </ListItemIcon>
            <ListItemText primary="Proyección" />
          </ListItem>
        </List>

      </Collapse>
      
      <Link to="#">
        <ListItem button>
          <ListItemIcon>
          <SettingsOutlinedIcon/>
          </ListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItem>
      </Link>
    </div>
  );
}

export default ListsItems
