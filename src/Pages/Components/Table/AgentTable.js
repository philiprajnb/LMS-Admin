import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import styles from "./Table.module.css"
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundImage: 'linear-gradient(to bottom, #5f3390, #302f8a)',
      color: theme.palette.common.white,
      fontWeight:600
    },
    body: {
      fontSize: 14,
      paddingTop: 10,
      paddingBottom: 10,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


let rows = [];

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable(props) {
    rows = props.tableData;
    rows.sort((a, b) => (    
      new Date(b.createdAt).getTime() > new Date(a.createdAt).getTime()?1:-1
      ));
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow className="text-nowrap">
            <StyledTableCell>Agent ID</StyledTableCell>
            <StyledTableCell align="left">Agent Name</StyledTableCell>
            <StyledTableCell align="left">Region</StyledTableCell>
            <StyledTableCell align="left">Zip Code</StyledTableCell>
            <StyledTableCell align="left">Branch</StyledTableCell>
            <StyledTableCell align="left">Email Address</StyledTableCell>
            <StyledTableCell align="left">Mobile No</StyledTableCell>
            <StyledTableCell align="left" >Year of Experience</StyledTableCell>
            <StyledTableCell align="left" >Max Limit</StyledTableCell>
            <StyledTableCell align="left" >Leads Assigned</StyledTableCell>
            <StyledTableCell align="left" >Available Limit</StyledTableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((agent) => (
           <StyledTableRow key={agent._id} className="text-nowrap">
              <StyledTableCell component="th" className={`cursor-pointer ${styles.flipper}`} scope="row" onClick={()=>{props.handleIDClick(agent)}} >
                {agent.agentID}
              </StyledTableCell>
              <StyledTableCell align="left">{agent.agentName}</StyledTableCell>
              <StyledTableCell align="left">{agent.region}</StyledTableCell>
              <StyledTableCell align="left">{agent.zipcode}</StyledTableCell>
              <StyledTableCell align="left">{agent.branch}</StyledTableCell>
              <StyledTableCell align="left">{agent.emailAdd}</StyledTableCell>
              <StyledTableCell align="left">{agent.mobileNo}</StyledTableCell>
              <StyledTableCell align="left">{agent.experience}</StyledTableCell>
              <StyledTableCell align="left">{agent.maxLimit}</StyledTableCell>
              <StyledTableCell align="left">{agent.agentBuckets.length}</StyledTableCell>
              <StyledTableCell align="left">{agent.maxLimit - agent.agentBuckets.length}</StyledTableCell>
            </StyledTableRow>
          ))}

          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: 1 }]}
              colSpan={12}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: false,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
