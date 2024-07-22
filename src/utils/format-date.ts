const formatDateForDatabase = (value: Date) => {
  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = value.getDay();
  const formattedDay = day < 10 ? `0${day}` : day;

  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliSeconds = date.getMilliseconds();

  const formattedDate = ""
    + `${year}-`
    + `${formattedMonth}-`
    + `${formattedDay}T`
    + `${hour}:`
    + `${minutes}:`
    + `${seconds}.`
    + `${milliSeconds}Z`;
  
  return formattedDate;
};

export default formatDateForDatabase;
