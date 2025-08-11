import React from 'react';
import PropTypes from 'prop-types';
import {
  //  lighten,
    makeStyles
   } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';


let rows = [
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'agentID', numeric: false, disablePadding: true, label: 'Agent ID' },
  { id: 'fullName', numeric: true, disablePadding: false, label: 'Full Name' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email Address' },
  { id: 'mobile', numeric: true, disablePadding: false, label: 'Mobile No' },
  { id: 'experience', numeric: true, disablePadding: false, label: 'Experience' },
  { id: 'maxLimit', numeric: false, disablePadding: true, label: 'Max Limit' },
  { id: 'assigned', numeric: false, disablePadding: true, label: 'Leads Assigned' },
  { id: 'available', numeric: false, disablePadding: true, label: 'Available Limit' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          
          Locked
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// const useToolbarStyles = makeStyles((theme) => ({
//   root: {
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(1),
//   },
//   highlight:
//     theme.palette.type === 'light'
//       ? {
//           color: theme.palette.secondary.main,
//           backgroundColor: lighten(theme.palette.secondary.light, 0.85),
//         }
//       : {
//           color: theme.palette.text.primary,
//           backgroundColor: theme.palette.secondary.dark,
//         },
//   title: {
//     flex: '1 1 100%',
//   },
// }));

const EnhancedTableToolbar = (props) => {
  // const classes = useToolbarStyles();
  // const { numSelected } = props;

  return (
    <Toolbar
      
    >
      {/* {
      numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      )
       : ( */}
        {/* <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Available Agents
        </Typography> */}
     
        <Typography className={`classes.title text-success`} variant="h6" id="tableTitle" component="div">
          {props.message}
        </Typography>
      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) :
       ( */}
        {/* <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip> */}
      
        </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function AvailableAgentsTable(props) {
    rows= props.agents
    
    const rowsData = [];
     rows.forEach(i=>{
         if(i.isLock ===true){
              rowsData.push(i.emailAdd)
         }
    })
    
    
  console.log(rowsData);
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([...rowsData]);
  const [page, setPage] = React.useState(0);
  /* eslint-disable */
  const [dense, setDense] = React.useState(true);
  /* eslint-disable */
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [message, setMessage] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const lockAgent = async (id)=>{
      const data = {userId: id};
      const headers = {headers: {
                        "authorization": sessionStorage.getItem('token')
                    }}
      const result = await axios.post('https://bot.candelalabs.io/lms-internal/api/agentData/lock',data,headers);
      console.log(result.data.message);
    setMessage(result.data.message)
    setTimeout(()=>{
        setMessage('')
    },1500)
  }
  const unlockAgent = async (id)=>{
    const data = {userId: id};
    const headers = {headers: {
                        "authorization": sessionStorage.getItem('token')
                    }}
    const result = await axios.post('https://bot.candelalabs.io/lms-internal/api/agentData/unlock',data,headers);
    
    setMessage(result.data.message)
    setTimeout(()=>{
        setMessage('')
    },1500);
  }
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
        lockAgent(name);
      newSelected = newSelected.concat(selected, name);
      console.log(newSelected,'-1');
    } else if (selectedIndex === 0) {
        unlockAgent(name);
      newSelected = newSelected.concat(selected.slice(1));
      console.log(newSelected,'0');
    } else if (selectedIndex === selected.length - 1) {
        unlockAgent(name);
      newSelected = newSelected.concat(selected.slice(0, -1));
      console.log(newSelected, 'length -1');
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
      console.log(newSelected, '> 0');
    }
    
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} message={message} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.emailAdd);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.emailAdd)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.agentID}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.agentID}
                      </TableCell>
                      <TableCell align="left" >{row.agentName}</TableCell>
                      <TableCell align="left">{row.emailAdd}</TableCell>
                      <TableCell align="left">{row.mobileNo}</TableCell>
                      <TableCell align="left">{row.experience}</TableCell>
                      <TableCell align="left">{row.maxLimit}</TableCell>
                      <TableCell align="left">{row.agentBuckets.length}</TableCell>
                      <TableCell align="left"  >{row.maxLimit - row.agentBuckets.length}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}
