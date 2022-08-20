import { InputUnstyled, InputUnstyledProps } from "@mui/base";
import { styled } from "@mui/system";
import { forwardRef } from "react";

const StyledInputElement = styled("input")`
	width: 90%;
	font-size: 1rem;
	font-family: IBM Plex Sans, sans-serif;
	font-weight: 400;
	line-height: 1.4375em;
	background: #f5f5f5;
	border: 1px solid #f5f5f5;
	border-radius: 10px;
	padding: 6px 10px;
	color: #20262d;
	transition: width 300ms ease;

	&:hover {
		background: #eaeef3;
		border-color: #e5e8ec;
	}

	&:focus {
		outline: none;
		width: 100%;
		transition: width 200ms ease-out;
	}
`;

const CustomInput = forwardRef(function CustomInput(
	props: InputUnstyledProps,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	return <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />;
});

export default CustomInput;
