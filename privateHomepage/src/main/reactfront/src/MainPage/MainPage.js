/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ImageCarousel from './ImageCarousel/ImageCarousel';
import { Fade } from 'react-awesome-reveal';
import './MainPage.scss';

import About from './About/About';
import Skills from './Skills/Skills';
import Mysite from './Mysite/Mysite';

const MainPage = () => {
	const [userInfo, setUserInfo] = useState([]);

	useEffect(() => {
		fetch(`https://dongsseop2.com/privateHomepage/user/`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setUserInfo(data[0]); //0: lds 1:cgj
			});
	}, []);

	const [projectUrls, setProjectUrls] = useState([]);
	const [projectDesc, setProjectDesc] = useState([]);

	useEffect(() => {
		let url_tmp = [];
		let desc_tmp = [];
		if (userInfo.project5_info === null) {
			url_tmp.push(userInfo.project1_url);
			desc_tmp.push(userInfo.project1_info);
		} else {
			url_tmp.push(userInfo.project1_url);
			url_tmp.push(userInfo.project2_url);
			url_tmp.push(userInfo.project3_url);
			url_tmp.push(userInfo.project4_url);
			url_tmp.push(userInfo.project5_url);
			desc_tmp.push(userInfo.project1_info);
			desc_tmp.push(userInfo.project2_info);
			desc_tmp.push(userInfo.project3_info);
			desc_tmp.push(userInfo.project4_info);
			desc_tmp.push(userInfo.project5_info);
		}
		setProjectUrls(url_tmp);
		setProjectDesc(desc_tmp);
	}, [userInfo]);

	return (
		<div>
			{userInfo === [] ? null : (
				<div className="container">
					<div className="intro1">
						<div className="intro-table">
							<ImageCarousel user={userInfo.number} />
							<div className="right-table">
								<Fade triggerOnce>
									<div className="profile-content">Hello</div>
								</Fade>
								<Fade triggerOnce delay={1500}>
									<div className="profile-content">{userInfo.job}</div>
								</Fade>
								<Fade triggerOnce delay={3000}>
									<div className="profile-content">{userInfo.user_name}</div>
								</Fade>
							</div>
						</div>
					</div>
					<About
						name={userInfo.user_name}
						location={userInfo.location}
						birthday={userInfo.birthday}
						email={userInfo.email_address}
						phone_number={userInfo.phone_number}
						university={userInfo.university}
						dept={userInfo.dept}
					/>
					<Skills skill={userInfo.skill} />
					<Mysite git={userInfo.git_url} projectUrls={projectUrls} projectDesc={projectDesc} />
				</div>
			)}
		</div>
	);
};

export default MainPage;
