 // Your code here
function createEmployeeRecord(employeeArray){
 const [ firstName, familyName, title, payPerHour] = employeeArray
 return{
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
 }
}
let createEmployeeRecords = function(employeeArrayData) {
    return employeeArrayData.map(function(employeeArray){
        return createEmployeeRecord(employeeArray)
    })
}
let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}
let hoursWorkedOnDate = function(employee, date){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === date
    })

    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}
let wagesEarnedOnDate = function(employee,date){
        const payPerHr = employee.payPerHour
        const wagesEarned = hoursWorkedOnDate(employee,date) * payPerHr
      return parseFloat(wagesEarned.toString())
}
function allWagesFor(employee){
    const datesWorked = employee.timeInEvents.map(element => element.date)
    const totalWages = datesWorked.reduce((total, date) =>{
        const wagesEarned =wagesEarnedOnDate(employee, date)
        return total + wagesEarned
    },0)
    return totalWages
}
let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce((total,employeeWage)=>{
        return total + allWagesFor(employeeWage)
    }, 0)
}