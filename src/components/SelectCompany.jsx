import { Modal, Button, ListGroup } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import {selectCompany} from '../actions/auth.action';
import {useHistory} from 'react-router-dom';

const SelectCompany = ({show, setShow}) => {
	const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const auth = useSelector(state => state.auth);
  const history = useHistory()
	return (
		<>
  
		<Modal show={show} onHide={handleClose}>
		  <Modal.Header closeButton>
			<Modal.Title>Selecciona una empresa</Modal.Title>
		  </Modal.Header>

		  <Modal.Body>
			<ListGroup>
				{
					auth.Companies.map(company => (
						<ListGroup.Item action key={company.Id} onClick={() => dispatch(selectCompany(company, history))}>
						{
							company.Name
						}
					</ListGroup.Item>
					))
				}
			</ListGroup>
		  </Modal.Body>

		  <Modal.Footer>
			<Button 
				variant="secondary" 
				onClick={handleClose}
			>
			  Cancelar
			</Button>
		  </Modal.Footer>
		</Modal>
	  </>
	)
}

export default SelectCompany
