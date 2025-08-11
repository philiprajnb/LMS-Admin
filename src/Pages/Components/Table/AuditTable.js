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
import moment from 'moment'
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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
            <StyledTableCell>Lead ID</StyledTableCell>
            <StyledTableCell align="center">Lead Creation Date</StyledTableCell>
            <StyledTableCell align="center">Full Name</StyledTableCell>
            <StyledTableCell align="center">Email Address</StyledTableCell>
            <StyledTableCell align="center">Mobile No</StyledTableCell>
            <StyledTableCell align="center">Channel</StyledTableCell>
            <StyledTableCell align="center">Location</StyledTableCell>
            <StyledTableCell align="center">Zip Code</StyledTableCell>
            <StyledTableCell align="center">Primary Language</StyledTableCell>
            <StyledTableCell align="center" >Lead Score</StyledTableCell>
            <StyledTableCell align="center" >Classification</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            
        </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((lead) => (
           <StyledTableRow key={lead._id} className="text-nowrap">
              <StyledTableCell component="th" className={`cursor-pointer ${styles.flipper}`} scope="row" onClick={()=>{props.openCommentBox(lead)}}>
                {lead.processID}
              </StyledTableCell>
              <StyledTableCell align="center">{moment(lead.createdAt).format('LL')}</StyledTableCell>
              <StyledTableCell align="center">{lead.processData['Full Name']}</StyledTableCell>
              <StyledTableCell align="center">{lead.processData['Email Address']}</StyledTableCell>
              <StyledTableCell align="center">{lead.processData['Mobile No']}</StyledTableCell>
              <StyledTableCell align="center">{lead.processData.Channel}</StyledTableCell>
              <StyledTableCell align="center">{lead.processData.Location}</StyledTableCell>
              <StyledTableCell align="center">{lead.processData['Zip Code']}</StyledTableCell>
              <StyledTableCell align="center">{lead.processData['Primary Language']}</StyledTableCell>
              <StyledTableCell align="center">{lead.processData['Lead Score']}</StyledTableCell> 
              <StyledTableCell align="center">{lead.processData.Potential}</StyledTableCell>     
              <StyledTableCell align="center" className={'cursor-pointer'} title={lead.processData['WF Description']}>
              {lead.processData['WF Status']}
              </StyledTableCell>
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
