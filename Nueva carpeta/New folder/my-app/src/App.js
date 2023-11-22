import React from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  font-family: 'Arial', sans-serif;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: ${(props) => (props.isScrolled ? '#ffffff' : 'transparent')};
  color: ${(props) => (props.isScrolled ? '#2c3e50' : '#ecf0f1')};
  border-bottom: ${(props) => (props.isScrolled ? '1px solid #ecf0f1' : 'none')};
  transition: background-color 0.3s, color 0.3s, border-bottom 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  max-width: 100vw;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const NavLink = styled.a`
  color: #ecf0f1;
  text-decoration: none;
  font-size: 1em;
  margin-bottom: 5px;
  &:hover {
    border-bottom: 2px solid #ecf0f1;
  }
`;

const Footer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  visibility: ${(props) => (props.showFooter ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.showFooter ? '1' : '0')};
  transition: visibility 0.5s, opacity 0.5s;
`;

const FooterLogo = styled(Logo)`
  margin-left: 20px;
`;

const FooterSocialIcons = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialIcon = styled.a`
  color: #ecf0f1;
  font-size: 1.5em;
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
`;

const Section = styled.div`
  height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.green ? '#2ecc71' : '#ffffff')};
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: ${(props) => (props.green ? '#ffffff' : '#2c3e50')};
`;

const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 30px;
  color: ${(props) => (props.green ? '#ffffff' : '#2c3e50')};
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const AboutSection = styled(Section)`
  background-color: #ffffff;
`;

const ImagesContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
`;

const ScrollableImages = styled.div`
  display: flex;
  animation: scrollImages 10s linear infinite;
`;

const scrollImagesAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const ScrollableImage = styled.div`
  min-width: 100%;
  flex: 0 0 auto;
  margin-right: 20px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  animation: ${scrollImagesAnimation} 10s linear infinite;
`;
const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const FormInput = styled.input`
  padding: 10px;
  font-size: 1em;
`;

const FormButton = styled(Button)`
  width: auto;
`;


function App() {
  const [showFooter, setShowFooter] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const rect = contactSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      setShowFooter(isVisible);
    }

    // Check if the user has scrolled down
    setIsScrolled(window.scrollY > 0);
  };

  const [formData, setFormData] = React.useState({
    name: '',
    telephone: '',
    email: '',
  });

  // Event handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, e.g., send the data to a server
    console.log('Form submitted:', formData);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container>
      <NavBar isScrolled={isScrolled}>
        <Logo>
          <LogoImage src="/path/to/your/logo.png" alt="Logo" />
          <span>Your Logo</span>
        </Logo>
        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>
      </NavBar>
      <Section id="home" green>
        <Title>Home Section</Title>
        <Subtitle>Welcome to the home section!</Subtitle>
        <Button>Learn More</Button>
      </Section>
      <AboutSection id="about">
        <Title>About Section</Title>
        <Subtitle>Learn more about us.</Subtitle>
        <ImagesContainer>
          <ScrollableImages>
            <ScrollableImage image="/path/to/image1.jpg" />
            <ScrollableImage image="/path/to/image2.jpg" />
            {/* Add more ScrollableImage components with different images */}
          </ScrollableImages>
        </ImagesContainer>
        <Button>Explore</Button>
      </AboutSection>
      <LeftAlignedSection id="services" green>
        <Title>Services Section</Title>
        <Subtitle>Discover our services.</Subtitle>
        <Button>See Services</Button>
      </LeftAlignedSection>
      <LeftAlignedSection id="contact">
      <Section id="contact">
        <Title>Contact Section</Title>
        <Subtitle>Get in touch with us.</Subtitle>
        <ContactForm onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <FormInput
            type="tel"
            name="telephone"
            placeholder="Your Telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            required
          />
          <FormInput
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <FormButton type="submit">Submit</FormButton>
        </ContactForm>
      </Section>
      </LeftAlignedSection>
      <Footer showFooter={showFooter}>
        <FooterLogo>
          <LogoImage src="/path/to/your/logo.png" alt="Logo" />
          <span>Your Logo</span>
        </FooterLogo>
        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>
        <FooterSocialIcons>
          <SocialIcon href="#linkedin">LinkedIn</SocialIcon>
          <SocialIcon href="#whatsapp">WhatsApp</SocialIcon>
          <SocialIcon href="#instagram">Instagram</SocialIcon>
        </FooterSocialIcons>
      </Footer>
    </Container>
  );
}

export default App;