import "./LoginForm.scss";
import { useFormik } from "formik";
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from "react-router-dom";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values: { email: string, password: string }) => {
  const errors: { email?: string, password?: string } = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = "Password is required"
  }

  return errors;
};

interface LoginFormProps {
  updateAuthStatus: (value: boolean) => void;
}

const LoginForm = ({updateAuthStatus}: LoginFormProps) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate,
    onSubmit: async(values) => {
      try {
        // console.log(JSON.stringify(values));
        const signInResponse = await signIn({
          username: values.email,
          password: values.password
        });
        console.log("sign in response: ", signInResponse);
        updateAuthStatus(true);
        navigate("/");
      } catch (error) {
        console.log("SignIn error: ", error)
      }
    }
  });

  return (
    <div className="login-page">
      <h2>Sign In</h2>
      <div className="form">
        <form onSubmit={formik.handleSubmit} className="login-form">
          <div>
            <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" />
            {formik.errors.email ? <div className="error-message">{formik.errors.email}</div> : null}
          </div>
          <div>
            <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" />
            {formik.errors.password ? <div className="error-message">{formik.errors.password}</div> : null}
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;