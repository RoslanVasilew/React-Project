import { useNavigate } from "react-router-dom";
import "/src/assets/CSS/AdminPanel.css";
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const AdminPanel = () => {
  const api = "https://localhost:7132/";
  const email = JSON.parse(localStorage.getItem('email'));
  const [teachers, setTeachers] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  React.useEffect(() => {
    const ReadTeachersApi = api + "api/Teacher/Read";
    const ReadStudentsApi = api + "api/Student/ReadAll1";
    fetch(ReadTeachersApi)
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);
      })
      .catch(() => {
        console.log("err");
      });
      fetch(ReadStudentsApi)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      })
      .catch(() => {
        console.log("err");
      });
  }, []);

function createStatData(action) {
  return {
    action,
    history: [
      {
        student: students.length,
        teacher: teachers.length,
        amount: students.length + teachers.length,
      }
    ],
  };
}

function Row1(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.action}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                All users
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Students</TableCell>
                    <TableCell>Teachers</TableCell>
                    <TableCell align="right">Overall</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.student}>
                      <TableCell component="th" scope="row">
                        {historyRow.student}
                      </TableCell>
                      <TableCell>{historyRow.teacher}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function createStudentData(action) {
  return{
    action,
    students
  }
}

function Row2(props) {
  const { row } = props;
  const [open2, setOpen2] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen2(!open2)}
          >
            {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.action}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                All students
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {row.students.map((student) => (
                    <TableRow key={student.email}>
                      <TableCell component="th" scope="row">
                        {student.name}
                      </TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function createTeacherData(action) {
  return{
    action,
    teachers
  }
}

function Row3(props) {
  const { row } = props;
  const [open3, setOpen3] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen3(!open3)}
          >
            {open3 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.action}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                All teachers
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>fields</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {row.teachers.map((teacher) => (
                    <TableRow key={teacher.email}>
                      <TableCell component="th" scope="row">
                        {teacher.name}
                      </TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>{teacher.phone}</TableCell>
                      <TableCell>{teacher.fields}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createStatData('Check user statistic'),
  createStudentData('Check all students'),
  createTeacherData('Check all teachers'),
];

return (
  email && (email === "admin@admin.admin")? (
    <div className="adminP">
      <br/>
      <h1>Admin panel</h1>
      <br/>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Row1 key={rows[0].action} row={rows[0]} />
            <Row2 key={rows[1].action} row={rows[1]} />
            <Row3 key={rows[2].action} row={rows[2]} />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : <div><h1>PLS CONNECT</h1></div>
)}



export default AdminPanel;
