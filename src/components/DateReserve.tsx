import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function DateReserve({
  onDateChange,
  day,
}: {
  onDateChange: Function;
  day: any;
}) {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={day}
          className="rounded-lg bg-white border-[#FA4EAB] border-2"
          format="DD/MM/YYYY"
          sx={{ width: "100%" }}
          onChange={(value) => onDateChange(value)}
        />
      </LocalizationProvider>
    </>
  );
}
