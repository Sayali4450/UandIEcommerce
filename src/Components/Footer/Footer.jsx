import './footer.css';

export const Footer = () => {
	return (
		<>
			<a href='#' className='btn btn-float-action' id='back-to-top'>
				<i className='fas fa-arrow-up'></i>
			</a>
			<footer className='footer text-center'>
				<div className='footer-header'>
					Made with <span className='primary-text-color'>&lt;/&gt;</span> love
					
				</div>
				
				<div className='text-light-weight body-cp-md footer-copy'>
					© 2022 U<span className='primary-text-color body-cp-sm'>&</span>I
					Designs
				</div>
			</footer>
		</>
	);
};
