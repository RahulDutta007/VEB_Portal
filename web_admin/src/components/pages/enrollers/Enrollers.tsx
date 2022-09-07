import { useState } from "react";
import { GroupOwner } from "../../../@types/groupOwner.types";
import EnrollersGrid from "./enrollersGrid/EnrollersGrid";

const Enrollers = (): JSX.Element => {
	return (
		<>
			<EnrollersGrid />
		</>
	);
};

export default Enrollers;
