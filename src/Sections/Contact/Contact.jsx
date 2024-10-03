import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import Faq from "../Faq/Faq"
const Section = styled.div`
  background-color: #010116;
  height: 100vh;
  width: 100%;
  margin-top: 40vh ;
  scroll-snap-align: center;
  @media only screen and (min-width: 1080px) {
    
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 1030px) {
    justify-content: center;
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: 50px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Input = styled.input`
  padding: 20px;
  background-color: #14102e;
  border: none;
  color: #fff;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #14102e;
  //  [Feature]: Hover effect while cursor is on SEND button #484 
  resize: none;
`;

const Button = styled.button`
  background-color: #1d28f2;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 auto;
  width: 90%;
  padding: 0.5em;
  transition: 200ms ease-in-out;
  :hover {
    background-color: #138AF2;
  }
`;

const Img = styled.img`
  width: 600px;
  height: 600px;
  object-fit: contain;
  position: relative;
  top: 20;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1030px) {
    display: none;
  }
`;

const SuccessMessage = styled.p`
  text-align: center;
  color: green;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
`;

const Contact = () => {
  const ref = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(null);
  const [formMessage, setFormMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSuccess(false);
      setFormMessage("Input Fields cannot be empty :(");
      setShowModal(true); // Show the modal
      return;
    }

    emailjs
      .sendForm(
        "nscc_website_contactpage",
        "template_o142frd",
        ref.current,
        process.env.REACT_APP_API
      )
      .then(
        (result) => {
          setFormData({ name: "", email: "", message: "" });
          setSuccess(true);
          setFormMessage(
            "Your message has been sent. We'll get back to you soon :)"
          );
          setShowModal(true);

          setTimeout(() => {
            setSuccess(null);
            setFormMessage("");
            setShowModal(false); // Hide the modal
          }, 2000);
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
          setShowModal(true); // Show the modal
        }
      );
  };

  return (
    <div className="mt-[105px] !important">
    <h2 className="mt-[100px] text-2xl text-center md:text-4xl lg:text-5xl font-bold">
        Frequenty Asked{" "}
        <span className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-800">
          <a href="#">Questions</a>
        </span>
      </h2>
      <Faq/>

    <Section>
      <Container>
        <Left>
          <Form ref={ref} onSubmit={handleSubmit}>
          {success === false && <ErrorMessage>{formMessage}</ErrorMessage>}
          {success === true && <SuccessMessage>{formMessage}</SuccessMessage>}
            <Title>Contact Us</Title>
            <Input
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={formData.name}
              autoComplete="off"
              required={true}
            />
            <Input
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
              value={formData.email}
              autoComplete="off"
              required={true}
            />
            <TextArea
              placeholder="Write your message"
              name="message"
              rows={10}
              onChange={handleChange}
              value={formData.message}
              required={true}
            />
            <Button type="submit">Send</Button>
            {showModal && (
              <Modal
                message={formMessage}
                onClose={() => setShowModal(false)}
              />
            )}
          </Form>
          {showModal && (
            <Modal message={formMessage} onClose={() => setShowModal(false)} />
          )}
        </Left>
        <Right>
          <Img src="./img/contact.svg" alt="Contact Illustration" />
        </Right>
      </Container>
    </Section>
    </div>
  );
};

export default Contact;
