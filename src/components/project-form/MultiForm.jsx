import FormProjectPageOne from "./FormProjectPageOne";
import FormProjectPageTwo from "./FormProjectPageTwo";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confirmation from "./Confirmation";

function MultiForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    step: location.search ? parseInt(location.search.slice(-1)) : 1,
    projectTitle: "",
    projectTagline: "",
    categories: [],
    logoImg: "",
    description: "",
    projectImages: [],
  });
  const {
    step,
    projectTitle,
    projectTagline,
    categories,
    logoImg,
    description,
    projectImages,
  } = form;
  const values = {
    step,
    projectTitle,
    projectTagline,
    categories,
    logoImg,
    description,
    projectImages,
  };

  // Proceed to next step
  const nextStep = () => {
    const { step } = form;
    setForm((prevState) => ({ ...prevState, step: step + 1 }));
    navigate(`/projects/create?step=${step + 1}`);
  };
  // Go back to previous step
  const prevStep = () => {
    const { step } = form;
    setForm((prevState) => ({ ...prevState, step: step - 1 }));
    navigate(`/projects/create?step=${step - 1}`);
  };
  // Handle field change
  const handleChange = (input) => (event) => {
    setForm((prevState) => ({
      ...prevState,
      [input]: event.target.value,
    }));
  };
  // Handle save as draft
  const saveDraft = () => {
    // Send post request to projects
    // Reroute to project you just created in draft
    // If error snack bar with details
  }
  // Handle publish
  const publish = () => {
    // Send post request to projects
    // Reroute to project you just created
    // If error snack bar with details
  }
  switch (step) {
    case 1:
      return (
        <FormProjectPageOne
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 2:
      return (
        <FormProjectPageTwo
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      );
    case 3:
      return (
        <Confirmation
          saveDraft={saveDraft}
          publish={publish}
          prevStep={prevStep}
          values={values}
        />
      );
    default:
      break;
  }
}

export default MultiForm;
