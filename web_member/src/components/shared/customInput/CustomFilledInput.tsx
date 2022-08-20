import { FilledInput, styled } from "@mui/material";

const CustomFilledInput = styled(FilledInput)(({ theme }) => ({
	borderRadius: "10px",
	width: "90%",
	fontSize: "1rem",
	fontFamily: "IBM Plex Sans, sans-serif",
	fontWeight: 400,
	lineHeight: "1.4375em",
	background: "#f5f5f5",
	border: "1px solid #f5f5f5",
	padding: "6px 10px",
	color: "#20262d",
	"label + &": {
		marginTop: theme.spacing(3)
	},
	"& .MuiInputBase-input": {
		outline: "none",
		"&:focus": {
			outline: "none",
			width: "100%",
			transition: "width 200ms ease-out"
		},
		"&:before": {
			borderBottom: "none !important"
		}
	}
}));

export default CustomFilledInput;
