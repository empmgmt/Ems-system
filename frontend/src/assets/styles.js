export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  leftContainer: {
    flex: 1,
    background: 'linear-gradient(135deg, #20c997, #17a2b8)',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundPattern: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    backgroundImage: 'url("https://speckyboy.com/wp-content/uploads/2019/05/login-form-design-04.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.2,
    zIndex: 0,
  },
  rightContainer: {
    flex: 1.5,
    background: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    zIndex: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: '3rem', // Increased size of 'Welcome Back!'
    fontWeight: 'bold',
    marginBottom: '10px',
    zIndex: 1,
  },
  stitle: {
    fontSize: '2rem', // Increased size of 'Welcome Back!'
    fontWeight: 'bold',
    marginBottom: '10px',
    zIndex: 1,
  },
  subtitle: {
    fontSize: '1.6rem', // Smaller text
    fontWeight: 'normal', // Remove bold
    marginBottom: '20px',
    zIndex: 1,
  },
  subtitle2: {
    fontSize: '2.5rem', // Smaller text
    fontWeight: 'bold', // Remove bold
    marginBottom: '10px',
    zIndex: 1,
  },
  
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ced4da',
    borderRadius: '5px',
    zIndex: 1,
  },
  button: {
    backgroundColor: '#20c997',
    color: 'white',
    border: '1px solid white', // Added a white border to the button
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    zIndex: 1,
    width: '70%',
  },
  buttonHover: {
    backgroundColor: '#17a2b8',
  },

  socialIcons: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: '20px',
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: '15px',
    top: '30%',
    cursor: 'pointer',
    zIndex: 1,
  },
  buttons: {
    backgroundColor: '#20c997',
    color: 'white',
    border: '1px solid white', // Added a white border to the button
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    zIndex: 1,
    width: '40%',
  },
  radioOptions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '20px',
    width: '100%',
    marginBottom: '10px', // Reduce space below
    marginTop: '-5px', // Move up slightly
  },
};
