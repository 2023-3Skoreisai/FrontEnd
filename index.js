import axios from "axios";

const res = await axios.get('https://api.crystaworld1221.com/3s_class/v1/analytics/get');
const dates = res.data.byDate.map(item => item.date);
const formattedDates = dates.map(date => {
  const month = date.substr(4, 2);
  const day = date.substr(6, 2);
  return `${month}/${day}`;
});
console.log(formattedDates);