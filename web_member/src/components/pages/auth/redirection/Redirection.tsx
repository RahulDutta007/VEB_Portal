import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../api";
import { useQuery } from "../../../../hooks";

const Redirection = (): JSX.Element => {
	const navigate = useNavigate();
	const query = useQuery();

	const verifyRedirection = useCallback(async () => {
		if (query && query.get("token") && query.get("id")) {
			const memberToken = await api.redirection.redirectUser(
				query.get("id") as string,
				query.get("token") as string
			);
			localStorage.setItem("@jwt_group_owner", query.get("token") as string);
			localStorage.setItem("@jwt_member", memberToken as string);
			setTimeout(() => null, 3000);
			navigate("/VEB/enrollment");
		}
	}, [query, navigate]);

	useEffect(() => {
		verifyRedirection();
	}, [verifyRedirection]);

	return <>redirecting...</>;
};

export default Redirection;
