import { InputBase, styled } from "@mui/material";

const CustomSelectInput = styled(InputBase)(({ theme }) => ({
	"label + &": {
		marginTop: theme.spacing(3)
	},
	"& .MuiInputBase-input": {
		width: "88%",
		fontSize: "1rem",
		fontFamily: "IBM Plex Sans, sans-serif",
		fontWeight: 400,
		lineHeight: "1.4375em",
		background: "#f5f5f5",
		border: "1px solid #f5f5f5",
		borderRadius: "10px",
		padding: "6px 10px",
		color: "#20262d",
		"&:focus": {
			borderRadius: 4,
			borderColor: "#80bdff",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
		}
	}
}));

export default CustomSelectInput;
