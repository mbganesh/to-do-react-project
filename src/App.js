import {
  AppBar,
  Button,
  Card,
  Checkbox,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteForever";

const darkTheme = makeStyles((theme) => ({
  rootBackground: {
    backgroundColor: "#737373",
    minHeight: "100vh",
    maxWidth: "100vw",
    overflow: "hidden",
  },

  mainBox: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "25px",
    marginBottom: "25px",
    backgroundColor: "#737373",
  },

  boxInputs: {
    display: "flex",
    width: "100%",
    padding: "5%",
  },

  boxRow: {
    display: "flex",
    padding: "10px",
    "&:hover": {
      backgroundColor: "#E26A2C",
      color: "#fff",
      transform: "scale(1.05)",
      transitionDuration: "0.5s",
    },
  },
}));

function App() {
  const classes = darkTheme();

  const getData = () => {
    const datas = JSON.parse(localStorage.getItem("lists"));
    if (datas) {
      return datas;
    } else {
      return [];
    }
  };

  const [myList, setMyList] = useState(getData());
  const [myTask, setMyTask] = useState("");
  const [isCompleted, setIsCompleted] = useState("none");
  const [isChecked, setIsChecked] = useState(false);

  const handleAdd = () => {
    if (myTask.trim() !== "") {
      myList.push(
        {
          data:myTask,
          status:isChecked
        }
      );
      localStorage.setItem("lists", JSON.stringify(myList));
      setMyTask("");
      console.log(myList);
      return;
    } else {
      alert("please enter a task title");
    }
  };

  const handleTaskTitle = (e) => {
    setMyTask(e.target.value);
  };

  const handleDelete = (i) => {
    console.log(i);
    delete myList[i];
    localStorage.setItem("lists", JSON.stringify(myList));
    setMyList(myList);
    console.log(myList);
  };

  const handleChecked = (e, i) => {

    console.log(myList[i])

    console.log(e);

    if(e){
      setIsChecked(true)
    }else{
      setIsChecked(false)
    }

  if(!isChecked) {
    setIsCompleted("line-through")
  }else{
    setIsCompleted('none')
  }
    
  }

  return (
    <div className={classes.rootBackground}>
      <AppBar
        sx={{
          boxShadow: "none",
          backgroundColor: "#262626",
          position: "static",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            To-Do App
          </Typography>
        </Toolbar>
      </AppBar>

      <Card className={classes.mainBox} sx={{ backgroundColor: "#d9d9d9" }}>
        <Typography
          variant="h5"
          sx={{
            padding: "10px",
            width: "100%",
            textAlign: "center",
            backgroundColor: "#0d0d0d",
            color: "white",
          }}
        >
          My Tasks
        </Typography>

        <div className={classes.boxInputs}>
          <TextField
            style={{ flex: 1, marginLeft: "5%", marginRight: "5%" }}
            variant="outlined"
            label="Add new task"
            value={myTask}
            onChange={(e) => handleTaskTitle(e)}
          />
          <Button
            style={{ flex: 0.1, marginRight: "5%" }}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            type="submit"
          >
            Add
          </Button>
        </div>

        {/* list */}
        <div
          style={{
            width: "100%",
          }}
        >
          {myList.map((task, i) => (
            <div className={classes.boxRow}>
              <Checkbox style={{ flex: 0.2 }} checked={task.status} onChange={(e) => handleChecked(e.target.checked, i)} color="success" />
              <Typography
                style={{ flex: 1, textDecoration:isCompleted }}
                variant="h6"
              >
                {task.data}
              </Typography>
              <Button
                style={{ padding: "10px", flex: 0.2 }}
                onClick={() => handleDelete(i)}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
        </div>
        <Button
          style={{ padding: "10px", margin: "10px" }}
          onClick={() => setMyList([])}
          variant="outlined"
        >
          Clear All
        </Button>
      </Card>
    </div>
  );
}

export default App;
