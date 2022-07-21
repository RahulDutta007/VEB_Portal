import "./VEBPlanCard.css";

const VEBPlanCard = () => {
	return (
		<div className="VEB-plan-card">
			<ul>
				<div className="card-category-5">
					<li>
						<div className="per-card-2">
							<div className="card-image">
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
							</div>

							<div className="card-content">
								<div className="card-text">
									<span>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
										Ipsum has been the industry&aposs standard dummy text ever since the 1500s, when
										an an unknown printer took a galley of type and scrambled it to make a type
										specimen book.
									</span>
								</div>

								<div className="social-icons">
									<i className="fab fa-linkedin-in" title="LinkedIn"></i>
									<i className="fab fa-twitter" title="Twitter"></i>
									<i className="fab fa-facebook-f" title="Facebook"></i>
									<i className="fab fa-whatsapp" title="WhatsApp"></i>
								</div>
							</div>
						</div>
					</li>
				</div>
			</ul>
		</div>
	);
};

export default VEBPlanCard;
