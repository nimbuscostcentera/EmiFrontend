import moment from "moment";
function SortArrayByString(order, Array, field) {
  if (order === "Asc") {
    Array.sort((a, b) => a[field].localeCompare(b[field]));
  } else if (order === "Desc") {
    Array.sort((a, b) => b[field].localeCompare(a[field]));
  }
}

export default SortArrayByString;
