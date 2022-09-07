import React, { useCallback, useContext, useState } from "react";
import { Button, Grid } from "@mui/material";
import "./VEBPlanCard.css";
import { ThemeContext } from "../../../../src/contexts/index";
import VEBTabular from "../VEBTabular/VEBTabular";
import VEBModal from "../VEBModal/VEBModal";

const VEBPlanCard = (props: any) => {
	const { theme } = useContext(ThemeContext);
	const [addBeneficiaryDetails, setAddBeneficiaryDetails] = useState({});
	const [modalOpen, setModalOpen] = useState(false);
	const handleBenificiary = useCallback((event: any) => {
		setModalOpen(true);
	}, []);
	const handleAddBenificiary = useCallback(
		(event: any) => {
			if (event.currentTarget.name === "set-to-estate") {
				setAddBeneficiaryDetails(
					Object.assign({}, addBeneficiaryDetails, {
						Name: "abcd",
						Relation: "Estate",
						Percentage: 100,
						Type: "P"
					})
				);
			} else if (event.currentTarget.name === "set-to-spouse") {
				const spouseDetails = props.familyMember.find((val: any, index: number) => {
					if (val.relation === "Spouse") {
						return true;
					} else {
						return false;
					}
				});
				setAddBeneficiaryDetails(
					Object.assign({}, addBeneficiaryDetails, {
						Name: spouseDetails.name,
						Relation: spouseDetails.relation,
						Percentage: 100,
						Type: "P"
					})
				);
			} else {
				setModalOpen(!modalOpen);
			}
		},
		[addBeneficiaryDetails, props.familyMember, modalOpen]
	);
	return (
		<div className="VEB-plan-card">
			<ul>
				<div className="card-category-5">
					<li>
						<div className="per-card-3">
							{/* <div className="card-image">
								<ul>
									<li>
										<img src="https://www.dropbox.com/s/tcf4pyscta9pt13/jigneshpanchal.JPG?raw=1" />
									</li>
									<li>
										<div className="per-name">Jignesh Panchal</div>
										<div className="per-position">Founder & CEO</div>
										<a className="card-btn" title="Connect">
											<span></span>
										</a>
									</li>
								</ul>
							</div> */}
							<div className="card-title">Becca has 1 primary and 0 contingent</div>
							<div className="card-title">
								<Grid container spacing={1}>
									<Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
										<Button
											className="plan-action-button"
											name="set-to-estate"
											variant="contained"
											size="small"
											style={{
												backgroundColor: theme.button.background_color,
												color: theme.button.color,
												opacity: 0.8
											}}
											onClick={handleAddBenificiary}
										>
											Set to Estate
										</Button>
									</Grid>
									<Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
										<Button
											className="plan-action-button"
											variant="contained"
											name="set-to-spouse"
											size="small"
											style={{
												backgroundColor: theme.button.background_color,
												color: theme.button.color,
												opacity: 0.8
											}}
											onClick={handleAddBenificiary}
										>
											Set to Spouse
										</Button>
									</Grid>
									<Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
										<Button
											className="plan-action-button"
											name="add-beneficiary"
											variant="contained"
											size="small"
											style={{
												backgroundColor: theme.button.background_color,
												color: theme.button.color,
												opacity: 0.8
											}}
											onClick={handleBenificiary}
										>
											Add Beneficiary
										</Button>
									</Grid>
								</Grid>
							</div>
							<VEBModal open={modalOpen}></VEBModal>
							<div className="card-content">
								<VEBTabular memberDetails={addBeneficiaryDetails}></VEBTabular>
								{/* <div className="card-text">
									<span>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
										Ipsum has been the industry&aposs standard dummy text ever since the 1500s, when
										an an unknown printer took a galley of type and scrambled it to make a type
										specimen book.
									</span>
								</div> */}
							</div>
							<div className="card-footer">6% primary and 0% contingent</div>
						</div>
					</li>
				</div>
			</ul>
		</div>
	);
};

export default VEBPlanCard;
