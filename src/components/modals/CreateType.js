// import React, { useState } from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import { createType } from "../../http/deviceApi";

// const CreateType = ({show, onHide}) =>{
//     const [value, setValue] = useState("");

//     const addType = () => {
//         createType({ name: value }).then(data => {
//             setValue('')
//             onHide()
//         }) // then... для обнуление input
//     }

//     return (
//         <>
//             <Modal
//                 show={show}
//                 onHide={onHide}
//                 backdrop="static"
//                 keyboard={false}
//             >
//                 <Modal.Header closeButton>
//                 <Modal.Title>Modal title</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                 I will. not close if you click outside me. Don not even try to press
//                 escape key
//                 </Modal.Body>
//                     <Form.Group>
//                         <Form.Control
//                             value={value}
//                             onChange={e => setValue(e.target.value)}
//                             placeholder={"Назва Type"}
//                         />
//                     </Form.Group>
//                 <Modal.Footer> 
//                     <Button variant="secondary" onClick={onHide}>Закрити</Button>
//                     <Button variant="primary" onClick={addType}>Додати</Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// };

// export default CreateType;