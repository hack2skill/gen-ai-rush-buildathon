import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "./Modal/Modal";
import config from "../config";

function Dashboard() {
	const [name, setName] = useState("user");
	const [pastInterviews, setPastInterviews] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		/*fetch the username by doing GET /user and sessionStorage 'idToken' in here*/

		fetch(config.backendUrl + "/user", {
			method: 'GET',
			headers: {
				'auth-token': sessionStorage.getItem('idToken')
			}

		})
			.then(res => {
				if (res.status === 200) { return res.json() }
				else if (res.status === 400) {
					console.log("The token is invalid") // TODO: show error message to user
					sessionStorage.removeItem('idToken')
					navigate("/");
				}
				else { console.log("something went wrong", res) }
			})
			.then(data => {
				setName(data.name);
				setPastInterviews(data.interviews);
			})
			.catch(e => { console.log(e) })

		// setPastInterviews([
		//     { name: 'Interview 1', duration: '30 minutes', date: '2022-01-01' },
		//     { name: 'Interview 2', duration: '45 minutes', date: '2022-02-01' },
		//     { name: 'Interview 3', duration: '60 minutes', date: '2022-03-01' },
		//   ]);

	}, []);

	const openModal = () => {
		setShowModal(true);
	}

	const closeModal = () => {
		setShowModal(false);
	}

	return (
		<div>
			<h2>Welcome {name}</h2>
			<button onClick={openModal}>
				<h3>TAKE THE INTERVIEW</h3>
			</button>

			<Modal show={showModal} closeModal={closeModal} />

			<br></br>
			<br></br>
			<h3>Your Past Interviews</h3>
			{pastInterviews.length ? (
				pastInterviews.map((interview, index) => {
					return (
						<li key={index}>
							<strong>{interview.name}</strong>
							<p>Duration: {interview.duration}</p>
							<p>Date: {interview.date}</p>
						</li>
					);
				})
			) : (
				<p>No past interview records found</p>
			)}
		</div>
	);
}

export default Dashboard;
