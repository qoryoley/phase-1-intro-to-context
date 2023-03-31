// Your code here


const createEmployeeRecord = (arrayOfEmployeeData) => {
    return {
      firstName: arrayOfEmployeeData[0],
      familyName: arrayOfEmployeeData[1],
      title: arrayOfEmployeeData[2],
      payPerHour: arrayOfEmployeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  };
  const createEmployeeRecords = (arrayOfArrays) => {
    const arrayOfObjects = [];
    for (let record of arrayOfArrays) {
      let newRecord = createEmployeeRecord(record);
      arrayOfObjects.push(newRecord);
    };
    return arrayOfObjects;
  };

  const createTimeInEvent = (employeeRecord, dateStamp) => {
    const date = dateStamp.split(" ")[0];
    const time = dateStamp.split(" ")[1];
    const timeInEntry = {
      type: "TimeIn",
      hour: parseInt(time),
      date: date
    }
    employeeRecord.timeInEvents.push(timeInEntry);
    return employeeRecord;
  }
  
  const createTimeOutEvent = (employeeRecord, dateStamp) => {
    const date = dateStamp.split(" ")[0];
    const time = dateStamp.split(" ")[1];
    const timeOutEntry = {
      type: "TimeOut",
      hour: parseInt(time),
      date: date
    }
    employeeRecord.timeOutEvents.push(timeOutEntry);
    return employeeRecord;
  }
  
  const hoursWorkedOnDate = (employeeRecord, date = "all") => {
    function sumTimeCardTimes(arrayOfTimePunches, date) {
      const arrayOfTimes = [];
      const reducer = (prevValue, currValue) => prevValue + currValue;
  
      for (let punch of arrayOfTimePunches) {
        if (date = "all") {
          arrayOfTimes.push(punch.hour)
        } else {
        ( punch.date === date ? arrayOfTimes.push(punch.hour) : null );
        }
      }
      const sumOfTimes = arrayOfTimes.reduce(reducer);
      return sumOfTimes;
    }
  
    // (Sum of all time out hours) - (Sum of all time in hours) = hours worked
    const sumOfTimeIn = sumTimeCardTimes(employeeRecord.timeInEvents, date)
    const sumOfTimeOut = sumTimeCardTimes(employeeRecord.timeOutEvents, date)
    return (sumOfTimeOut - sumOfTimeIn)/100;
  }
  
  const wagesEarnedOnDate = (employeeRecord, date = "all") => {
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
  }
  
  const allWagesFor = employeeRecord => {
    return wagesEarnedOnDate(employeeRecord);
  }
  
  const calculatePayroll = arrayOfEmployeeRecords => {
    let sum = 0;
    for (let currEmployee of arrayOfEmployeeRecords) {
      // console.log("Wages for:", allWagesFor(currEmployee));
      // console.log(currEmployee);
      // debugger;
      sum += allWagesFor(currEmployee);
    }
    return sum;
  }