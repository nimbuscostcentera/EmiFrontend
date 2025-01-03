import moment from "moment";
function SortArrayByDate(order, Array, field) {
  if (order === "Asc") {
      Array.sort((a, b) => {
        let sdate=  moment(a[field]);
          let edate = moment(b[field]);
          return sdate.diff(edate);
      });
  } else if (order === "Desc") {
      Array.sort((a, b) => {
         let sdate=  moment(a[field]);
          let edate = moment(b[field]);
         return edate.diff(sdate);
    } )
    }
}

export default SortArrayByDate