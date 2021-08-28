import React from "react";
import { Card } from "react-bootstrap";
import SignupForm from "../form/signupForm/SignupForm";
import useForm from "../../../../hooks/form/useForm";
import { signupInput } from "../form/signupForm/type/signupInputType";
import { auth, createUser } from "../../../../config/firebase/Firebase";
import "./signup.css";

const Signup: React.FC = () => {
  const signupInitInput = {
    username: "",
    useremail: "",
    userpassword: "",
    usertype: "",
  };
  const [input, changeSignupInput] = useForm(signupInitInput);

  const handleSubmitSignupForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await createUser(auth, input.useremail, input.userpassword);
      console.log(user);
    } catch (err) {
      if (err) console.log(err);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Sign up</h2>
        <SignupForm
          input={input as signupInput}
          onChangeInput={changeSignupInput}
          onSubmitForm={handleSubmitSignupForm}
          isSubmitFormDisabled={Object.values(input).includes("")}
        />
      </Card.Body>
    </Card>
  );
};

export default Signup;
