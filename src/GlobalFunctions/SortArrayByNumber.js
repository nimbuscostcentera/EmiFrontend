export default function SortArrayByNumber(order, Array, field) {
  if (order === "Asc") {
    Array.sort((a, b) => a[field] - b[field]);
  } else if (order === "Desc") {
    Array.sort((a, b) => b[field] - a[field]);
  }
}
