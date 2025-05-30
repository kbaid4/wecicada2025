import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './SignInPage.module.css';
import { supabase } from '../supabaseClient';

const SignInPage = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    // Supabase Auth sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    // Redirect on successful login
    navigate("/SuppliersPage"); 
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Track window width for responsive background image
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bgStyle = windowWidth > 600 ? {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/landingpage/loginbg.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  } : undefined;

  return (
    <div className={styles['main-container']} style={bgStyle}>
      <div className={styles['signin-container']}>
        <div className={styles['logo-container']}>
          <img 
            src={`${process.env.PUBLIC_URL}/images/landingpage/logo.png`} 
            alt="CITADA Logo" 
            className={styles['site-logo']}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles['signin-form']}>
          <div className={styles['form-group']}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className={styles['error-message']}>{error}</div>}

          <button type="submit" className={styles['signin-button']}>Sign In</button>
        </form>

        <a href="#" className={styles['forgot-password']}>Forgot Password?</a>
      </div>
    </div>
  );
};

export default SignInPage;