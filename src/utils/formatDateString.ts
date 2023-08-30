const formatDateString = (dateString: string) => {
  const [datePart, timePart] = dateString.split("T");
  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");

  const formattedDate = `${year}년 ${parseInt(month)}월 ${parseInt(
    day
  )}일 ${hour}시 ${minute}분`;
  return formattedDate;
};

export default formatDateString;
