import React, { useState, useEffect } from 'react';
import './Tache.css';
import TachesService from '../../service/TacheService';
import TacheService from '../../service/TacheService';

const TaskInterface = () => {
  const [taskNumber, setTaskNumber] = useState('');
  const [taskName, setTaskName] = useState('');
  const [startTime, setStartTime] = useState(
    localStorage.getItem('startTime') || null
  );
  const [elapsedTime, setElapsedTime] = useState(
    localStorage.getItem('elapsedTime') || 0
  );
  const [taskList, setTaskList] = useState([]);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  useEffect(() => {
    TacheService.getByIdProject(localStorage.getItem("id_project")).then((result) => {
        console.log(result["data"]["data"]);
        console.log("result");

        setTaskList(result["data"]["data"]);
      }).catch((error) => {
        console.error(error);
      });
      ;
    console.log("taskListFromDB")
    console.log(taskList)
    
    if(localStorage.getItem("taskNumber") != null && localStorage.getItem("taskName")!= null ){
        setTaskNumber(localStorage.getItem("taskNumber"))
        setTaskName(localStorage.getItem("taskName"))

    }
    let timer;
    if (startTime !== null) {
      timer = setInterval(() => {
        const currentTime = Date.now();
        const storedElapsedTime = parseInt(localStorage.getItem('elapsedTime')) || 0;
        const newElapsedTime = currentTime - parseInt(startTime) + storedElapsedTime;
        console.log("- ")
        setElapsedTime(newElapsedTime);
        setStopwatchTime(newElapsedTime);
        localStorage.setItem('elapsedTime', newElapsedTime);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [startTime]);

  const startTimer = () => {
    setStartTime(Date.now());
    localStorage.setItem('startTime', Date.now());
    localStorage.setItem('taskName',taskName);
    localStorage.setItem('taskNumber',taskNumber);

  };

  const stopTimer = () => {
    if (startTime === null) {
      return;
    }

    const newTask = {
      "num_tache":taskNumber,
      "nom_tache":taskName,
      "duration": elapsedTime,
      "date_debut": new Date().toLocaleDateString(),
      "date_fin": new Date().toLocaleDateString(),
      "id_projet": localStorage.getItem("id_project")
    };
    console.log(newTask)
    setTaskList([...taskList, newTask]);
    setTaskNumber('');
    setTaskName('');
    setStartTime(null);
    setElapsedTime(0);
    setStopwatchTime(0);
    localStorage.setItem('taskList', JSON.stringify([...taskList, newTask]));
    localStorage.removeItem('startTime');
    localStorage.removeItem('elapsedTime');
    
    TachesService.createTache(newTask);
  };

  const deleteTask = (index,id) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
    localStorage.setItem('taskList', JSON.stringify(updatedTaskList));
    TacheService.deletetache(id);
  };

  const formatTime = (time) => {
    if (time >= 3600000) {
      const hours = Math.floor(time / 3600000);
      return `${hours} hour(s)`;
    } else if (time >= 60000) {
      const minutes = Math.floor(time / 60000);
      return `${minutes} minute(s)`;
    } else {
      const seconds = Math.floor(time / 1000);
      return `${seconds} second(s)`;
    }
  };

  return (
    <div className="task-interface">
      <h2>Task Interface</h2>
      <div className="input-group">
        <label htmlFor="taskNumber">Task Number:</label>
        <input
          type="number"
          id="taskNumber"
          value={taskNumber}
          onChange={(e) => setTaskNumber(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
      <div className="stopwatch">
        <h3>Stopwatch Time: {formatTime(stopwatchTime)}</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th>Task Number</th>
            <th>Task Name</th>
            <th>Time</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map((task, index) => (
            <tr key={index}>
              <td>{task.num_tache}</td>
              <td>{task.nom_tache}</td>
              <td>{formatTime(task.duration)}</td>
              <td>{task.date_debut.substring(0, task.date_debut.indexOf("T"))}</td>
              <td>
                <button onClick={() => deleteTask(index,task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskInterface;
